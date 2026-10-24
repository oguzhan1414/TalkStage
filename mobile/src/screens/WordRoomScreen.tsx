import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoVoiceImages } from '../assets/images';
import { Button } from '../components/Button';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { RoomImage, regionAspect, type Region, type RoomMarker } from '../components/rooms/RoomImage';
import { ACTIVITY_XP } from '../constants/xp';
import { findWordRoom, type RoomItem, type WordRoom } from '../data/wordRooms';
import { useRoomSpeech } from '../hooks/useRoomSpeech';
import { getLocale, t } from '../i18n';
import { api, ApiError } from '../lib/api';
import { haptics } from '../lib/haptics';
import { postQueued } from '../lib/outbox';
import { addMastered, loadMastered, saveLastRoom } from '../lib/wordRoomProgress';
import type { WordRoomScreenProps } from '../navigation/types';
import { colors, fonts, shadow, spacing } from '../theme/tokens';
import type { VocabCardOut } from '../types/api';

/** Words in one game. */
const SESSION_SIZE = 8;
/** How many of them are spelled with letter tiles; the rest are recalled from three choices. */
const SPELL_COUNT = 3;

type Phase = 'explore' | 'find' | 'spell' | 'recall' | 'done';
type Results = Record<string, boolean>;
type DotState = 'todo' | 'now' | 'ok' | 'late' | 'miss';

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/** Words not learned yet come first; already learned ones fill the rest of the game as review. */
function buildSession(room: WordRoom, mastered: Set<string>): RoomItem[] {
  return [...shuffle(room.items.filter((i) => !mastered.has(i.id))), ...shuffle(room.items.filter((i) => mastered.has(i.id)))].slice(
    0,
    SESSION_SIZE
  );
}

/** A wide crop around one object (about 0.62 as tall as wide), for the spell and recall questions. */
function focusRegion(room: WordRoom, item: RoomItem): Region {
  const w = clamp(item.r * 6, 20, 60);
  const h = Math.min(100, (w * 0.62) / room.aspect);
  const x0 = clamp(item.x - w / 2, 0, 100 - w);
  const y0 = clamp(item.y - h / 2, 0, 100 - h);
  return { x0, y0, x1: x0 + w, y1: y0 + h };
}

/** The object nearest to the tap, if the tap is close enough to it. `pxPerPct` is screen pixels per percent of the width. */
function hitItem(candidates: RoomItem[], x: number, y: number, pxPerPct: number, aspect: number): RoomItem | null {
  let best: RoomItem | null = null;
  let bestDist = Infinity;
  for (const item of candidates) {
    const dist = Math.hypot((x - item.x) * pxPerPct, (y - item.y) * pxPerPct * aspect);
    const reach = Math.max(item.r * pxPerPct * 1.25, 24);
    if (dist <= reach && dist < bestDist) {
      best = item;
      bestDist = dist;
    }
  }
  return best;
}

/** Timers that die with the component. */
function useLater() {
  const ids = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => ids.current.forEach(clearTimeout), []);
  return useCallback((fn: () => void, ms: number) => {
    ids.current.push(setTimeout(fn, ms));
  }, []);
}

const showNative = () => getLocale() !== 'en';

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

/** The room photo scaled to the space it is given: as big as fits, so the game never needs scrolling. */
function FitRoom(props: {
  room: WordRoom;
  region?: Region;
  markers: RoomMarker[];
  onPressImage?: (x: number, y: number, pxPerPct: number) => void;
  onPressMarker?: (id: string) => void;
}) {
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const width = box ? Math.floor(Math.min(box.w, box.h / regionAspect(props.room, props.region))) : 0;
  return (
    <View
      style={styles.fit}
      onLayout={(e) => {
        const { width: w, height: h } = e.nativeEvent.layout;
        setBox((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
      }}
    >
      {width > 0 ? <RoomImage {...props} width={width} /> : null}
    </View>
  );
}

/** Always-visible bottom bar: progress on the left, the next step on the right. */
function Footer({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  return <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>{children}</View>;
}

function Dots({ states }: { states: DotState[] }) {
  return (
    <View style={styles.dots}>
      {states.map((s, i) => (
        <View
          key={i}
          style={[
            styles.dotPip,
            s === 'now' && styles.dotPipNow,
            s === 'ok' && { backgroundColor: colors.success },
            s === 'late' && { backgroundColor: colors.warning },
            s === 'miss' && { backgroundColor: colors.error },
          ]}
        />
      ))}
    </View>
  );
}

function SpeakButton({ onPress, small }: { onPress: () => void; small?: boolean }) {
  const size = small ? 38 : 46;
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [styles.speak, { width: size, height: size, borderRadius: size / 2 }, pressed && { transform: [{ scale: 0.92 }] }]}
      accessibilityRole="button"
      accessibilityLabel={t("Dinle")}
    >
      <Ionicons name="volume-high" size={small ? 18 : 22} color={colors.brand} />
    </Pressable>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Keşfet: tap every pin, hear the word, remember where it lives.  */
/* ------------------------------------------------------------------ */

function ExplorePhase({ room, session, onDone }: { room: WordRoom; session: RoomItem[]; onDone: () => void }) {
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<RoomItem | null>(null);
  const { pronounce } = useRoomSpeech();
  const allSeen = seen.size >= session.length;
  const cheered = useRef(false);

  useEffect(() => {
    if (allSeen && !cheered.current) {
      cheered.current = true;
      haptics.success();
    }
  }, [allSeen]);

  const select = (item: RoomItem) => {
    haptics.light();
    setSelected(item);
    setSeen((prev) => (prev.has(item.id) ? prev : new Set(prev).add(item.id)));
    pronounce(item.en).catch(() => {});
  };

  /** The next object not looked at yet (or simply the next one), for people who cannot spot a pin. */
  const selectNext = () => {
    const from = selected ? session.indexOf(selected) : -1;
    for (let k = 1; k <= session.length; k++) {
      const cand = session[(from + k) % session.length];
      if (!seen.has(cand.id)) {
        select(cand);
        return;
      }
    }
    select(session[(from + 1) % session.length]);
  };

  const markers: RoomMarker[] = session.map((i) => ({ kind: 'dot', id: i.id, x: i.x, y: i.y, done: seen.has(i.id), active: selected?.id === i.id }));
  if (selected) markers.push({ kind: 'tag', id: selected.id, x: selected.x, y: selected.y, text: selected.en, tone: 'info' });

  return (
    <>
      <View style={styles.body}>
        <View style={styles.hintRow}>
          <Ionicons name="hand-left-outline" size={16} color={colors.brand} />
          <Text style={styles.hintText}>{t("Noktalara dokun, kelimeyi duy ve yerini aklında tut.")}</Text>
        </View>

        <FitRoom
          room={room}
          markers={markers}
          onPressMarker={(id) => {
            const item = session.find((i) => i.id === id);
            if (item) select(item);
          }}
        />

        <View style={styles.panel}>
          {selected ? (
            <View style={[styles.wordCard, shadow.card]}>
              <View style={styles.wordRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.wordEn} numberOfLines={1}>
                    {selected.en}
                  </Text>
                  {showNative() ? (
                    <Text style={styles.wordNative} numberOfLines={1}>
                      {selected.native()}
                    </Text>
                  ) : null}
                </View>
                <SpeakButton onPress={() => pronounce(selected.en).catch(() => {})} />
                <Pressable
                  onPress={selectNext}
                  hitSlop={8}
                  style={({ pressed }) => [styles.nextBtn, pressed && { opacity: 0.7 }]}
                  accessibilityRole="button"
                  accessibilityLabel={t("Sıradaki")}
                >
                  <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </Pressable>
              </View>
              <Pressable onPress={() => pronounce(selected.example).catch(() => {})} style={styles.exampleRow} accessibilityRole="button">
                <Ionicons name="volume-medium-outline" size={16} color={colors.textMuted} />
                <Text style={styles.exampleText} numberOfLines={2}>
                  {selected.example}
                </Text>
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={selectNext} style={({ pressed }) => [styles.emptyCard, pressed && { opacity: 0.8 }]} accessibilityRole="button">
              <Ionicons name="finger-print-outline" size={26} color={colors.brand} />
              <View style={{ flex: 1 }}>
                <Text style={styles.emptyTitle}>{t("Bir noktaya dokun")}</Text>
                <Text style={styles.emptySub}>{t("Bulamazsan buraya dokun, sıradakini gösteririm.")}</Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>

      <Footer>
        <View style={styles.footLeft}>
          <Dots states={session.map((i) => (seen.has(i.id) ? 'ok' : 'todo'))} />
          <Text style={[styles.footText, allSeen && styles.footTextOk]}>
            {allSeen ? t("Hepsini gördün!") : t("{{seen}}/{{total}} eşya", { seen: seen.size, total: session.length })}
          </Text>
        </View>
        <Button label={t("Oyuna başla")} onPress={onDone} disabled={!allSeen} variant="chunky" />
      </Footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · Bul: hear a word, tap the object in the room.                   */
/* ------------------------------------------------------------------ */

function FindPhase({ room, session, onDone }: { room: WordRoom; session: RoomItem[]; onDone: (r: Results) => void }) {
  const order = useMemo(() => shuffle(session), [session]);
  const [idx, setIdx] = useState(0);
  const [misses, setMisses] = useState(0);
  const [marks, setMarks] = useState<RoomMarker[]>([]);
  const [note, setNote] = useState<{ text: string; tone: 'ok' | 'bad' | 'info' } | null>(null);
  // 'revealing': the wrong label is still up; the answer and the Continue button come a moment later.
  const [state, setState] = useState<'play' | 'ok' | 'revealing' | 'revealed'>('play');
  const [outcome, setOutcome] = useState<Record<string, DotState>>({});
  const results = useRef<Results>({});
  const later = useLater();
  const { pronounce } = useRoomSpeech();
  const target = order[idx];

  useEffect(() => {
    if (target) pronounce(target.en).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const next = () => {
    if (idx + 1 >= order.length) {
      onDone(results.current);
      return;
    }
    setIdx(idx + 1);
    setMisses(0);
    setMarks([]);
    setNote(null);
    setState('play');
  };

  const showAnswer = () => {
    if (!target) return;
    setState('revealed');
    setMarks([
      { kind: 'ring', id: target.id, x: target.x, y: target.y, r: target.r },
      { kind: 'tag', id: target.id, x: target.x, y: target.y, text: target.en, tone: 'info' },
    ]);
  };

  const fail = (withDelay: boolean) => {
    if (!target) return;
    results.current[target.id] = false;
    setOutcome((o) => ({ ...o, [target.id]: 'miss' }));
    setNote({ text: t("İşte burada: {{word}}. Yerini aklında tut.", { word: target.en }), tone: 'info' });
    if (withDelay) {
      setState('revealing');
      later(showAnswer, 900);
    } else {
      showAnswer();
    }
  };

  const onTap = (x: number, y: number, pxPerPct: number) => {
    if (state !== 'play' || !target) return;
    const hit = hitItem(room.items, x, y, pxPerPct, room.aspect);
    if (!hit) {
      setMarks([]);
      setNote({ text: t("Orada tanıdık bir eşya yok, tekrar dene."), tone: 'info' });
      return;
    }
    if (hit.id === target.id) {
      haptics.success();
      results.current[target.id] = misses === 0;
      setOutcome((o) => ({ ...o, [target.id]: misses === 0 ? 'ok' : 'late' }));
      setMarks([{ kind: 'tag', id: hit.id, x: hit.x, y: hit.y, text: hit.en, tone: 'ok' }]);
      setNote({ text: misses === 0 ? t("Harika, ilk denemede!") : t("Buldun!"), tone: 'ok' });
      setState('ok');
      later(next, 1000);
      return;
    }
    haptics.warning();
    const missCount = misses + 1;
    setMisses(missCount);
    setMarks([{ kind: 'tag', id: hit.id, x: hit.x, y: hit.y, text: t("Bu: {{word}}", { word: hit.en }), tone: 'bad' }]);
    if (missCount < 2) {
      setNote({ text: t("O başka bir eşya. Bir daha bak!"), tone: 'bad' });
      return;
    }
    // Second miss: show where it is, so the next round starts from the right picture in the head.
    fail(true);
  };

  if (!target) return null;

  return (
    <>
      <View style={styles.body}>
        <View style={[styles.findCard, shadow.card]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.findLabel}>{t("Bul")}</Text>
            <Text style={styles.findWord} numberOfLines={1}>
              {target.en}
            </Text>
          </View>
          <SpeakButton onPress={() => pronounce(target.en).catch(() => {})} />
        </View>

        <FitRoom room={room} markers={marks} onPressImage={onTap} />

        <View style={styles.noteBox}>
          <Text style={[styles.note, note?.tone === 'ok' && styles.noteOk, note?.tone === 'bad' && styles.noteBad]} numberOfLines={2}>
            {note?.text ?? t("Bu eşyayı resimde bul ve üstüne dokun.")}
          </Text>
        </View>
      </View>

      <Footer>
        <View style={styles.footLeft}>
          <Dots states={order.map((i, k) => outcome[i.id] ?? (k === idx ? 'now' : 'todo'))} />
          <Text style={styles.footText}>{`${idx + 1}/${order.length}`}</Text>
        </View>
        {state === 'revealed' ? (
          <Button label={t("Devam et")} onPress={next} variant="chunky" />
        ) : (
          <Button label={t("Göster")} onPress={() => fail(false)} variant="ghost" disabled={state !== 'play'} />
        )}
      </Footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Kelime yap: build the word from letter tiles.                   */
/* ------------------------------------------------------------------ */

function scramble(word: string): string[] {
  const letters = word.split('');
  if (letters.length < 2) return letters;
  for (let i = 0; i < 10; i++) {
    const s = shuffle(letters);
    if (s.join('') !== word) return s;
  }
  return [...letters].reverse();
}

function SpellPhase({ room, items, width, onDone }: { room: WordRoom; items: RoomItem[]; width: number; onDone: (r: Results) => void }) {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState<number[]>([]);
  const [tries, setTries] = useState(0);
  const [state, setState] = useState<'typing' | 'ok' | 'wrong' | 'revealed'>('typing');
  const [outcome, setOutcome] = useState<Record<string, DotState>>({});
  const results = useRef<Results>({});
  const later = useLater();
  const { pronounce } = useRoomSpeech();
  const item = items[idx];
  const tiles = useMemo(() => (item ? scramble(item.en) : []), [item]);

  const next = () => {
    if (idx + 1 >= items.length) {
      onDone(results.current);
      return;
    }
    setIdx(idx + 1);
    setTyped([]);
    setTries(0);
    setState('typing');
  };

  const check = (picked: number[]) => {
    if (!item) return;
    const word = picked.map((i) => tiles[i]).join('');
    if (word === item.en) {
      haptics.success();
      results.current[item.id] = tries === 0;
      setOutcome((o) => ({ ...o, [item.id]: tries === 0 ? 'ok' : 'late' }));
      setState('ok');
      pronounce(item.en).catch(() => {});
      later(next, 1200);
      return;
    }
    haptics.warning();
    const t2 = tries + 1;
    setTries(t2);
    if (t2 >= 2) {
      results.current[item.id] = false;
      setOutcome((o) => ({ ...o, [item.id]: 'miss' }));
      setState('revealed');
      pronounce(item.en).catch(() => {});
      return;
    }
    setState('wrong');
    later(() => {
      setTyped([]);
      setState('typing');
    }, 700);
  };

  const press = (tileIdx: number) => {
    if (state !== 'typing' || typed.includes(tileIdx)) return;
    haptics.selection();
    const picked = [...typed, tileIdx];
    setTyped(picked);
    if (picked.length === tiles.length) check(picked);
  };

  if (!item) return null;
  const slotSize = Math.min(40, Math.floor((width - (tiles.length - 1) * 6) / tiles.length));
  const shown = state === 'revealed' ? item.en.split('') : typed.map((i) => tiles[i]);

  return (
    <>
      <ScrollView style={styles.body} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.qText}>{t("Halkadaki eşyanın İngilizcesini harflerle kur.")}</Text>
        <RoomImage room={room} width={width} region={focusRegion(room, item)} markers={[{ kind: 'ring', id: item.id, x: item.x, y: item.y, r: item.r }]} />
        {showNative() ? <Text style={styles.nativeHint}>{item.native()}</Text> : null}

        <View style={styles.slots}>
          {tiles.map((_, i) => (
            <View
              key={i}
              style={[
                styles.slot,
                { width: slotSize, height: slotSize + 6 },
                state === 'ok' && styles.slotOk,
                state === 'wrong' && styles.slotBad,
                state === 'revealed' && styles.slotReveal,
              ]}
            >
              <Text style={[styles.slotText, { fontSize: slotSize > 32 ? 20 : 16 }]}>{(shown[i] ?? '').toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <View style={styles.tiles}>
          {tiles.map((letter, i) => {
            const used = typed.includes(i);
            return (
              <Pressable
                key={i}
                onPress={() => press(i)}
                disabled={used || state !== 'typing'}
                style={({ pressed }) => [styles.tile, used && styles.tileUsed, pressed && { transform: [{ translateY: 2 }] }]}
                accessibilityRole="button"
                accessibilityLabel={letter}
              >
                <Text style={styles.tileText}>{letter.toUpperCase()}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.spellTools}>
          <Pressable
            onPress={() => setTyped((p) => p.slice(0, -1))}
            disabled={state !== 'typing' || typed.length === 0}
            style={({ pressed }) => [styles.toolBtn, pressed && { opacity: 0.7 }]}
            accessibilityRole="button"
            accessibilityLabel={t("Sil")}
          >
            <Ionicons name="backspace-outline" size={20} color={colors.textBody} />
          </Pressable>
          <Text
            style={[
              styles.note,
              { flex: 1 },
              (state === 'wrong' || state === 'revealed') && styles.noteBad,
              state === 'ok' && styles.noteOk,
            ]}
          >
            {state === 'revealed'
              ? t("Doğrusu: {{word}}", { word: item.en })
              : state === 'ok'
                ? tries === 0
                  ? t("Tam isabet!")
                  : t("Oldu!")
                : state === 'wrong'
                  ? t("Olmadı, bir kez daha dene.")
                  : tries > 0
                    ? t("Son hakkın!")
                    : t("Harflere sırayla dokun.")}
          </Text>
        </View>
      </ScrollView>

      <Footer>
        <View style={styles.footLeft}>
          <Dots states={items.map((i, k) => outcome[i.id] ?? (k === idx ? 'now' : 'todo'))} />
          <Text style={styles.footText}>{`${idx + 1}/${items.length}`}</Text>
        </View>
        {state === 'revealed' ? <Button label={t("Devam et")} onPress={next} variant="chunky" /> : null}
      </Footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · Hatırla: which word is the object in the ring?                  */
/* ------------------------------------------------------------------ */

function RecallPhase({
  room,
  items,
  session,
  width,
  onDone,
}: {
  room: WordRoom;
  items: RoomItem[];
  session: RoomItem[];
  width: number;
  onDone: (r: Results) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<Record<string, DotState>>({});
  const results = useRef<Results>({});
  const later = useLater();
  const { pronounce } = useRoomSpeech();
  const item = items[idx];

  const choices = useMemo(() => {
    if (!item) return [];
    // Distractors from this game first (words just seen), then from the rest of the room.
    const pool = [...shuffle(session.filter((i) => i.id !== item.id)), ...shuffle(room.items.filter((i) => i.id !== item.id && !session.includes(i)))];
    return shuffle([item, ...pool.slice(0, 2)]);
  }, [item, room, session]);

  const next = () => {
    if (idx + 1 >= items.length) {
      onDone(results.current);
      return;
    }
    setIdx(idx + 1);
    setPicked(null);
  };

  const choose = (choice: RoomItem) => {
    if (!item || picked) return;
    setPicked(choice.id);
    const ok = choice.id === item.id;
    results.current[item.id] = ok;
    setOutcome((o) => ({ ...o, [item.id]: ok ? 'ok' : 'miss' }));
    pronounce(item.en).catch(() => {});
    if (ok) {
      haptics.success();
      later(next, 1100);
    } else {
      haptics.warning();
    }
  };

  if (!item) return null;
  const wrong = picked !== null && picked !== item.id;

  return (
    <>
      <ScrollView style={styles.body} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.qText}>{t("Halkadaki eşyanın adı ne?")}</Text>
        <RoomImage room={room} width={width} region={focusRegion(room, item)} markers={[{ kind: 'ring', id: item.id, x: item.x, y: item.y, r: item.r }]} />

        <View style={styles.choices}>
          {choices.map((c) => {
            const isAnswer = picked !== null && c.id === item.id;
            const isWrongPick = picked === c.id && c.id !== item.id;
            return (
              <Pressable
                key={c.id}
                onPress={() => choose(c)}
                disabled={picked !== null}
                style={({ pressed }) => [
                  styles.choice,
                  isAnswer && styles.choiceOk,
                  isWrongPick && styles.choiceBad,
                  pressed && { transform: [{ translateY: 2 }] },
                ]}
                accessibilityRole="button"
              >
                <Text style={[styles.choiceText, (isAnswer || isWrongPick) && { color: '#FFFFFF' }]}>{c.en}</Text>
              </Pressable>
            );
          })}
        </View>

        {wrong ? (
          <Text style={[styles.note, styles.noteBad]}>
            {showNative()
              ? t("Bu bir {{word}} ({{native}}).", { word: item.en, native: item.native() })
              : t("Bu bir {{word}}.", { word: item.en })}
          </Text>
        ) : picked ? (
          <Text style={[styles.note, styles.noteOk]}>{t("Doğru!")}</Text>
        ) : null}
      </ScrollView>

      <Footer>
        <View style={styles.footLeft}>
          <Dots states={items.map((i, k) => outcome[i.id] ?? (k === idx ? 'now' : 'todo'))} />
          <Text style={styles.footText}>{`${idx + 1}/${items.length}`}</Text>
        </View>
        {wrong ? <Button label={t("Devam et")} onPress={next} variant="chunky" /> : null}
      </Footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Sonuç                                                               */
/* ------------------------------------------------------------------ */

function ResultsView({
  room,
  session,
  findOk,
  checkOk,
  onReplay,
  onExit,
}: {
  room: WordRoom;
  session: RoomItem[];
  findOk: Results;
  checkOk: Results;
  onReplay: () => void;
  onExit: () => void;
}) {
  const queryClient = useQueryClient();
  const learned = session.filter((i) => findOk[i.id] && checkOk[i.id]);
  const missed = session.filter((i) => !(findOk[i.id] && checkOk[i.id]));
  const [roomTotal, setRoomTotal] = useState<number | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [saveError, setSaveError] = useState<string | null>(null);
  const savedOnce = useRef(false);

  const { data: cards } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });
  const owned = useMemo(() => new Set((cards ?? []).map((c) => c.term.trim().toLowerCase())), [cards]);
  const toSave = missed.filter((i) => !owned.has(i.en.toLowerCase()));

  useEffect(() => {
    if (savedOnce.current) return;
    savedOnce.current = true;
    addMastered(room.id, learned.map((i) => i.id)).then((all) => setRoomTotal(all.size));
    postQueued('/progress/log-practice')
      .then(() => queryClient.invalidateQueries({ queryKey: ['me'] }))
      .catch(() => {});
    if (learned.length === session.length) haptics.success();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveMissed = async () => {
    if (toSave.length === 0) return;
    setSaveState('saving');
    setSaveError(null);
    try {
      await Promise.all(
        toSave.map((i) =>
          api.post('/vocab-cards', {
            term: i.en,
            translation: i.native(),
            example_sentence: i.example,
            source_label: t("Kelime Odası · {{room}}", { room: room.title() }),
          })
        )
      );
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
      setSaveState('saved');
    } catch (err) {
      setSaveState('idle');
      setSaveError(err instanceof ApiError ? err.message : t("Kelimeler eklenirken hata oluştu."));
    }
  };

  const perfect = learned.length === session.length;

  return (
    <>
      <ScrollView style={styles.body} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.resultCard, shadow.card]}>
          <Image source={mivoVoiceImages.speak} style={styles.resultMivo} resizeMode="contain" />
          <Text style={styles.resultScore}>
            {learned.length}/{session.length}
          </Text>
          <Text style={styles.resultTitle}>
            {perfect
              ? t("Kusursuz! Bu odayı ezberledin.")
              : learned.length >= session.length / 2
                ? t("Güzel iş! Oda yavaş yavaş senin.")
                : t("İyi başlangıç, bir tur daha atalım mı?")}
          </Text>
          <Text style={styles.resultSub}>{t("+{{xp}} XP", { xp: ACTIVITY_XP })}</Text>
          {roomTotal !== null ? (
            <Text style={styles.resultSub}>{t("Bu odada {{n}}/{{total}} kelime öğrendin", { n: roomTotal, total: room.items.length })}</Text>
          ) : null}
        </View>

        <View style={[styles.listCard, shadow.card]}>
          {session.map((i) => {
            const ok = findOk[i.id] && checkOk[i.id];
            return (
              <View key={i.id} style={styles.listRow}>
                <Ionicons name={ok ? 'checkmark-circle' : 'close-circle'} size={20} color={ok ? colors.success : colors.error} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.listEn}>{i.en}</Text>
                  {showNative() ? <Text style={styles.listNative}>{i.native()}</Text> : null}
                </View>
              </View>
            );
          })}
        </View>

        {missed.length > 0 ? (
          toSave.length === 0 || saveState === 'saved' ? (
            <Text style={[styles.note, styles.noteOk]}>{t("Bilemediklerin Kelime Sandığında ✓")}</Text>
          ) : (
            <Button
              label={t("Bilemediklerimi sandığa ekle ({{n}})", { n: toSave.length })}
              onPress={saveMissed}
              loading={saveState === 'saving'}
              variant="secondary"
              style={styles.fullBtn}
            />
          )
        ) : null}
        {saveError ? <Text style={[styles.note, styles.noteBad]}>{saveError}</Text> : null}
      </ScrollView>

      <Footer>
        <Button label={t("Odalara dön")} onPress={onExit} variant="ghost" />
        <Button label={t("Tekrar oyna")} onPress={onReplay} variant="chunky" style={{ flex: 1 }} />
      </Footer>
    </>
  );
}

/* ------------------------------------------------------------------ */

const STEPS: { id: Exclude<Phase, 'done'>; label: () => string }[] = [
  { id: 'explore', label: () => t("Keşfet") },
  { id: 'find', label: () => t("Bul") },
  { id: 'spell', label: () => t("Kelime yap") },
  { id: 'recall', label: () => t("Hatırla") },
];

/**
 * "Kelime Odaları" game for one room: explore the pinned objects, then find, spell and recall them. A word counts
 * as learned when it was found on the first try and answered right in its second round. Explore and find fit the
 * photo to the screen and keep the next step in a fixed bottom bar, so nothing important hides below the fold.
 */
export function WordRoomScreen({ navigation, route }: WordRoomScreenProps) {
  const room = findWordRoom(route.params.roomId);
  const { finishTransition } = useMivoTransition();
  const { width: winW } = useWindowDimensions();
  const [session, setSession] = useState<RoomItem[] | null>(null);
  const [phase, setPhase] = useState<Phase>('explore');
  const [findOk, setFindOk] = useState<Results>({});
  const [checkOk, setCheckOk] = useState<Results>({});
  const [round, setRound] = useState(0);

  useEffect(() => {
    finishTransition();
  }, [finishTransition]);

  const start = useCallback(() => {
    if (!room) return;
    saveLastRoom(room.id);
    loadMastered(room.id).then((mastered) => {
      setSession(buildSession(room, mastered));
      setFindOk({});
      setCheckOk({});
      setPhase('explore');
      setRound((r) => r + 1);
    });
  }, [room]);

  useEffect(() => {
    start();
  }, [start]);

  const split = useMemo(() => {
    if (!session) return { spell: [] as RoomItem[], recall: [] as RoomItem[] };
    const spell = session.filter((i) => /^[a-z]{3,10}$/.test(i.en)).slice(0, SPELL_COUNT);
    return { spell, recall: session.filter((i) => !spell.includes(i)) };
  }, [session]);

  if (!room) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.note}>{t("Bu oda bulunamadı.")}</Text>
        <Button label={t("Geri")} onPress={() => navigation.goBack()} variant="ghost" />
      </SafeAreaView>
    );
  }

  const fullW = winW - spacing.md * 2;
  const stepIdx = STEPS.findIndex((s) => s.id === phase);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.back} accessibilityRole="button" accessibilityLabel={t("Geri")}>
          <Ionicons name="chevron-back" size={22} color={colors.textHeading} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{room.title()}</Text>
          <View style={styles.steps}>
            {STEPS.map((s, i) => (
              <View key={s.id} style={styles.stepItem}>
                <View style={[styles.stepBar, (phase === 'done' || i <= stepIdx) && styles.stepBarOn]} />
                <Text style={[styles.stepLabel, i === stepIdx && styles.stepLabelOn]} numberOfLines={1}>
                  {s.label()}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {!session ? null : phase === 'explore' ? (
        <ExplorePhase key={`e${round}`} room={room} session={session} onDone={() => setPhase('find')} />
      ) : phase === 'find' ? (
        <FindPhase
          key={`f${round}`}
          room={room}
          session={session}
          onDone={(r) => {
            setFindOk(r);
            setPhase(split.spell.length ? 'spell' : 'recall');
          }}
        />
      ) : phase === 'spell' ? (
        <SpellPhase
          key={`s${round}`}
          room={room}
          items={split.spell}
          width={fullW}
          onDone={(r) => {
            setCheckOk((prev) => ({ ...prev, ...r }));
            setPhase(split.recall.length ? 'recall' : 'done');
          }}
        />
      ) : phase === 'recall' ? (
        <RecallPhase
          key={`r${round}`}
          room={room}
          items={split.recall}
          session={session}
          width={fullW}
          onDone={(r) => {
            setCheckOk((prev) => ({ ...prev, ...r }));
            setPhase('done');
          }}
        />
      ) : (
        <ResultsView
          key={`d${round}`}
          room={room}
          session={session}
          findOk={findOk}
          checkOk={checkOk}
          onReplay={start}
          onExit={() => navigation.goBack()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: spacing.md, paddingTop: 8, paddingBottom: 8 },
  back: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  headerTitle: { fontFamily: fonts.headingBold, fontSize: 19, color: colors.textHeading },
  steps: { flexDirection: 'row', gap: 6, marginTop: 6 },
  stepItem: { flex: 1, gap: 3 },
  stepBar: { height: 5, borderRadius: 3, backgroundColor: '#E2E8F0' },
  stepBarOn: { backgroundColor: colors.brand },
  stepLabel: { fontFamily: fonts.bodyMedium, fontSize: 10.5, color: colors.textMuted },
  stepLabelOn: { fontFamily: fonts.headingBold, color: colors.brand },

  body: { flex: 1 },
  scroll: { paddingHorizontal: spacing.md, paddingTop: 4, paddingBottom: 24, gap: 12, alignItems: 'center' },
  fit: { flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: spacing.md, marginVertical: 8 },

  hintRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: spacing.md },
  hintText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18, color: colors.textBody },

  panel: { height: 124, paddingHorizontal: spacing.md, paddingBottom: 10 },
  wordCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10, gap: 8, borderWidth: 1, borderColor: '#EEF2FF' },
  wordRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  wordEn: { fontFamily: fonts.headingBold, fontSize: 24, lineHeight: 30, color: colors.brand },
  wordNative: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: colors.textMuted },
  nextBtn: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  exampleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#F8FAFC', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6 },
  exampleText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 18, color: colors.textHeading },
  emptyCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 20,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#C7D2FE',
    backgroundColor: '#FFFFFF',
  },
  emptyTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading },
  emptySub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 17, color: colors.textMuted, marginTop: 2 },

  findCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#EEF2FF',
  },
  findLabel: { fontFamily: fonts.headingBold, fontSize: 11.5, letterSpacing: 0.6, color: colors.brand, textTransform: 'uppercase' },
  findWord: { fontFamily: fonts.headingBold, fontSize: 28, lineHeight: 34, color: colors.textHeading },
  noteBox: { height: 44, justifyContent: 'center', paddingHorizontal: spacing.md },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing.md,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEF2FF',
  },
  footLeft: { flex: 1, gap: 6 },
  footText: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.textBody },
  footTextOk: { color: '#059669' },
  dots: { flexDirection: 'row', gap: 5, flexWrap: 'wrap' },
  dotPip: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E2E8F0' },
  dotPipNow: { backgroundColor: '#FFFFFF', borderWidth: 2.5, borderColor: colors.brand },

  speak: { backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#C7D2FE' },

  qText: { alignSelf: 'stretch', fontFamily: fonts.headingSemiBold, fontSize: 15, lineHeight: 21, color: colors.textHeading },
  note: { fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 19, color: colors.textMuted, textAlign: 'center' },
  noteOk: { color: '#059669', fontFamily: fonts.headingBold },
  noteBad: { color: '#E11D48', fontFamily: fonts.headingBold },
  fullBtn: { alignSelf: 'stretch' },

  nativeHint: { fontFamily: fonts.headingSemiBold, fontSize: 15, color: colors.textBody },
  slots: { flexDirection: 'row', gap: 6, justifyContent: 'center' },
  slot: { borderRadius: 10, borderWidth: 2, borderColor: '#CBD5E1', backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  slotOk: { borderColor: colors.success, backgroundColor: '#ECFDF5' },
  slotBad: { borderColor: colors.error, backgroundColor: '#FFF1F2' },
  slotReveal: { borderColor: '#FBBF24', backgroundColor: '#FFFBEB' },
  slotText: { fontFamily: fonts.headingBold, color: colors.textHeading },
  tiles: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  tile: {
    width: 46,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: '#C7D2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileUsed: { opacity: 0.25 },
  tileText: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.brand },
  spellTools: { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', gap: 10 },
  toolBtn: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center' },

  choices: { alignSelf: 'stretch', gap: 10 },
  choice: {
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  choiceOk: { backgroundColor: colors.success, borderColor: '#047857' },
  choiceBad: { backgroundColor: colors.error, borderColor: '#9F1239' },
  choiceText: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading },

  resultCard: { alignSelf: 'stretch', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 18, gap: 4, borderWidth: 1, borderColor: '#EEF2FF' },
  resultMivo: { width: 110, height: 110 },
  resultScore: { fontFamily: fonts.headingBold, fontSize: 40, lineHeight: 46, color: colors.brand },
  resultTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading, textAlign: 'center' },
  resultSub: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  listCard: { alignSelf: 'stretch', backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 6, paddingHorizontal: 14, borderWidth: 1, borderColor: '#EEF2FF' },
  listRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  listEn: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  listNative: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textMuted },
});
