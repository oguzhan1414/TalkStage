import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, Modal, PanResponder, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { companionImage, readingSceneImages, stateImages } from '../assets/images';
import { Button } from '../components/Button';
import { MicPermissionPrompt } from '../components/MicPermissionPrompt';
import { Toast } from '../components/Toast';
import { Waveform } from '../components/Waveform';
import { usePronunciation } from '../hooks/usePronunciation';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { api, ApiError } from '../lib/api';
import { useAnalytics } from '../lib/analytics';
import type { ReadingPassageScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type {
  GrammarMistakeCreate,
  GrammarMistakeOut,
  ReadingPassageOut,
  VocabCardCreate,
  VocabLookupOut,
} from '../types/api';

type StepMode = 'scene' | 'speaking';
type OrderStatus = 'pending' | 'correct' | 'wrong';

type Tile = { id: number; word: string };

function cleanWord(raw: string): string {
  return raw.replace(/[.,"“”!?:;]/g, '');
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function tilesFromSentence(sentence: string): Tile[] {
  return shuffle(sentence.split(' ').map((word, id) => ({ id, word })));
}

// In-context dictionary for instant translation tooltip
const QUICK_GLOSSARY: Record<string, string> = {
  hello: 'merhaba',
  name: 'isim / ad',
  fine: 'iyi',
  thank: 'teşekkür etmek',
  sky: 'gökyüzü',
  blue: 'mavi',
  apple: 'elma',
  red: 'kırmızı',
  coffee: 'kahve',
  magic: 'büyülü / sihirli',
  morning: 'sabah',
  monday: 'Pazartesi',
  tuesday: 'Salı',
  wednesday: 'Çarşamba',
  thursday: 'Perşembe',
  friday: 'Cuma',
  saturday: 'Cumartesi',
  sunday: 'Pazar',
  today: 'bugün',
  week: 'hafta',
  days: 'günler',
  standup: 'ayaküstü toplantı',
  bug: 'yazılım hatası',
  meeting: 'toplantı',
  team: 'ekip / takım',
  passport: 'pasaport',
  lost: 'kayıp / kaybolmuş',
  visa: 'vize',
  interview: 'mülakat',
  approved: 'onaylandı',
  startup: 'girişim',
  pitch: 'sunum / yatırım konuşması',
  revenue: 'gelir / ciro',
  ambassador: 'büyükelçi',
  treaty: 'anlaşma / mutabakat',
  unanimously: 'oybirliğiyle',
  wifi: 'kablosuz internet',
  tea: 'çay',
  breakfast: 'kahvaltı',
};

/**
 * Draggable Placed Tile (Inside the sentence arena)
 */
function DraggableSentenceTile({
  tile,
  isCorrect,
  onLayout,
  onDragStart,
  onDragMove,
  onDragEnd,
  onTap,
}: {
  tile: Tile;
  isCorrect: boolean;
  onLayout: (id: number, x: number, width: number) => void;
  onDragStart: (id: number) => void;
  onDragMove: (id: number, dx: number) => void;
  onDragEnd: (id: number, dx: number) => void;
  onTap: (tile: Tile) => void;
}) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDragging, setIsDragging] = useState(false);

  const callbacksRef = useRef({
    tile,
    isCorrect,
    onDragStart,
    onDragMove,
    onDragEnd,
    onTap,
  });
  callbacksRef.current = { tile, isCorrect, onDragStart, onDragMove, onDragEnd, onTap };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) =>
        !callbacksRef.current.isCorrect &&
        (Math.abs(gesture.dx) > 4 || Math.abs(gesture.dy) > 4),
      onPanResponderGrant: () => {
        if (callbacksRef.current.isCorrect) return;
        setIsDragging(true);
        pan.setValue({ x: 0, y: 0 });
        callbacksRef.current.onDragStart(callbacksRef.current.tile.id);
      },
      onPanResponderMove: (_, gesture) => {
        if (callbacksRef.current.isCorrect) return;
        pan.setValue({ x: gesture.dx, y: gesture.dy });
        callbacksRef.current.onDragMove(callbacksRef.current.tile.id, gesture.dx);
      },
      onPanResponderRelease: (_, gesture) => {
        setIsDragging(false);
        const moved = Math.abs(gesture.dx) > 10 || Math.abs(gesture.dy) > 10;
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();

        if (!moved || callbacksRef.current.isCorrect) {
          callbacksRef.current.onTap(callbacksRef.current.tile);
        } else {
          callbacksRef.current.onDragEnd(callbacksRef.current.tile.id, gesture.dx);
        }
      },
      onPanResponderTerminate: () => {
        setIsDragging(false);
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      onLayout={(e) =>
        onLayout(tile.id, e.nativeEvent.layout.x, e.nativeEvent.layout.width)
      }
      style={[
        styles.placedChip,
        isCorrect && styles.placedChipCorrect,
        isDragging && styles.draggingPlacedChip,
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
      ]}
    >
      <Text style={[styles.placedChipText, isCorrect && styles.placedChipTextCorrect]}>
        {tile.word}
      </Text>
    </Animated.View>
  );
}

/**
 * Draggable Bank Tile (In the pool below, can be dragged directly into the sentence arena)
 */
function DraggableBankTile({
  tile,
  onDragMoveUp,
  onDragEndUp,
  onTap,
}: {
  tile: Tile;
  onDragMoveUp: (tileId: number, moveX: number, moveY: number) => void;
  onDragEndUp: (tile: Tile, moveX: number, moveY: number) => void;
  onTap: (tile: Tile) => void;
}) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDragging, setIsDragging] = useState(false);

  const callbacksRef = useRef({ tile, onDragMoveUp, onDragEndUp, onTap });
  callbacksRef.current = { tile, onDragMoveUp, onDragEndUp, onTap };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 4 || Math.abs(gesture.dy) > 4,
      onPanResponderGrant: () => {
        setIsDragging(true);
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gesture) => {
        pan.setValue({ x: gesture.dx, y: gesture.dy });
        callbacksRef.current.onDragMoveUp(
          callbacksRef.current.tile.id,
          gesture.moveX,
          gesture.moveY
        );
      },
      onPanResponderRelease: (_, gesture) => {
        setIsDragging(false);
        const moved = Math.abs(gesture.dx) > 10 || Math.abs(gesture.dy) > 10;
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();

        if (moved) {
          callbacksRef.current.onDragEndUp(
            callbacksRef.current.tile,
            gesture.moveX,
            gesture.moveY
          );
        } else {
          callbacksRef.current.onTap(callbacksRef.current.tile);
        }
      },
      onPanResponderTerminate: () => {
        setIsDragging(false);
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.bankChip,
        isDragging && styles.draggingBankChip,
        { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
      ]}
    >
      <Text style={styles.bankChipText}>{tile.word}</Text>
    </Animated.View>
  );
}

export function ReadingPassageScreen({ route, navigation }: ReadingPassageScreenProps) {
  const { slug } = route.params;
  const { track } = useAnalytics();
  const queryClient = useQueryClient();
  const {
    pronounce,
    toggle,
    stop: stopAudio,
    isPlaying,
    isPaused,
  } = usePronunciation();
  const { isRecording, meteringDb, permissionDenied, start, stop: stopRecording } =
    useVoiceRecorder();

  const [currentStep, setCurrentStep] = useState<StepMode>('scene');
  const [sceneIdx, setSceneIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Audio Speed Toggle (1.0x vs 0.75x)
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);

  // Per-scene sentence-ordering exercise
  const [bank, setBank] = useState<Tile[]>([]);
  const [placed, setPlaced] = useState<Tile[]>([]);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('pending');
  const [showHint, setShowHint] = useState(false);
  const initializedRef = useRef(false);

  // Precise Screen Coordinates & Measurements for Drag & Drop
  const arenaRef = useRef<View>(null);
  const arenaLayoutRef = useRef<{
    pageX: number;
    pageY: number;
    width: number;
    height: number;
  }>({
    pageX: 20,
    pageY: 280,
    width: 340,
    height: 80,
  });
  const [dragHoverIndex, setDragHoverIndex] = useState<number | null>(null);
  const tilePositionsRef = useRef<
    Record<number, { x: number; width: number; centerX: number }>
  >({});

  // Tooltip Popover for Tapped Words (Dynamic Word Lookup)
  const [tooltipWord, setTooltipWord] = useState<{
    raw: string;
    clean: string;
    meaning: string;
    phonetic?: string;
    pos?: string;
    loading?: boolean;
  } | null>(null);

  // Celebration Modal on Finish
  const [celebrationVisible, setCelebrationVisible] = useState(false);
  const recordedMistakeScenesRef = useRef<Set<number>>(new Set());

  const { data: passage, isLoading, isError, refetch } = useQuery({
    queryKey: ['reading', slug],
    queryFn: () => api.get<ReadingPassageOut>(`/reading/${slug}`),
  });

  const scenes = passage?.scenes ?? [];
  const activeScene = scenes[sceneIdx];

  const measureArena = () => {
    arenaRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      if (width > 0 && height > 0) {
        arenaLayoutRef.current = { pageX, pageY, width, height };
      }
    });
  };

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast(msg);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 1800);
  };

  const startScene = (idx: number) => {
    const target = scenes[idx];
    if (!target) return;
    setSceneIdx(idx);
    setBank(tilesFromSentence(target.sentence_en));
    setPlaced([]);
    setOrderStatus('pending');
    setShowHint(false);
    setDragHoverIndex(null);
    tilePositionsRef.current = {};
    setTooltipWord(null);
    stopAudio();
  };

  useEffect(() => {
    if (!initializedRef.current && scenes.length > 0) {
      initializedRef.current = true;
      startScene(0);
    }
  }, [scenes.length]);

  const checkOrder = (newPlaced: Tile[]) => {
    if (activeScene && newPlaced.length === activeScene.sentence_en.split(' ').length) {
      const correct = newPlaced.every((t, i) => t.id === i);
      if (correct) {
        setOrderStatus('correct');
        setShowHint(true);
      } else {
        setOrderStatus('wrong');
        // Record sentence ordering mistake into Hata Defterim (deduped per scene)
        if (!recordedMistakeScenesRef.current.has(sceneIdx)) {
          recordedMistakeScenesRef.current.add(sceneIdx);
          const wrongSentence = newPlaced.map((t) => t.word).join(' ');
          api
            .post<GrammarMistakeOut>('/progress/mistakes', {
              topic_code: passage?.cefr_level ? `${passage.cefr_level}_Reading` : 'Reading',
              wrong_text: `${wrongSentence} (Yanlış Cümle Sıralaması)`,
              corrected_text: activeScene.sentence_en,
              explanation_tr: `"${activeScene.sentence_tr}" — Doğru kelime dizilimi: "${activeScene.sentence_en}"`,
              source: 'sentence_order',
            } satisfies GrammarMistakeCreate)
            .then(() => {
              queryClient.invalidateQueries({ queryKey: ['grammar-mistakes'] });
            })
            .catch(() => {
              // Request failed (network/server) — un-mark this scene so the
              // next wrong attempt can retry instead of being silently lost forever.
              recordedMistakeScenesRef.current.delete(sceneIdx);
            });
        }
      }
    } else {
      setOrderStatus('pending');
    }
  };

  // Add word from bank into placed (appends to end on tap)
  const handleBankTileTap = (tile: Tile) => {
    setBank((prevBank) => prevBank.filter((t) => t.id !== tile.id));
    setPlaced((prevPlaced) => {
      const nextPlaced = [...prevPlaced, tile];
      checkOrder(nextPlaced);
      return nextPlaced;
    });
  };

  // Dragging bank tile: calculates target index using exact finger screen coordinates!
  const handleBankTileDragMoveUp = (_tileId: number, moveX: number, moveY: number) => {
    measureArena();
    const arena = arenaLayoutRef.current;
    // Check if finger is hovering in or near the sentence arena vertically
    if (moveY < arena.pageY + arena.height + 40) {
      const fingerRelativeX = moveX - arena.pageX;
      let targetIdx = 0;
      for (const t of placed) {
        const pos = tilePositionsRef.current[t.id];
        if (pos && fingerRelativeX > pos.centerX) {
          targetIdx++;
        }
      }
      setDragHoverIndex(Math.min(targetIdx, placed.length));
    } else {
      setDragHoverIndex(null);
    }
  };

  // Dropping bank tile into sentence arena at target index
  const handleBankTileDragEndUp = (tile: Tile, moveX: number, moveY: number) => {
    setDragHoverIndex(null);
    measureArena();
    const arena = arenaLayoutRef.current;

    if (moveY < arena.pageY + arena.height + 60) {
      const fingerRelativeX = moveX - arena.pageX;
      let targetIdx = 0;
      for (const t of placed) {
        const pos = tilePositionsRef.current[t.id];
        if (pos && fingerRelativeX > pos.centerX) {
          targetIdx++;
        }
      }
      const clampedIdx = Math.max(0, Math.min(targetIdx, placed.length));

      setBank((prevBank) => prevBank.filter((t) => t.id !== tile.id));
      setPlaced((prevPlaced) => {
        const nextPlaced = [
          ...prevPlaced.slice(0, clampedIdx),
          tile,
          ...prevPlaced.slice(clampedIdx),
        ];
        checkOrder(nextPlaced);
        return nextPlaced;
      });
    } else {
      handleBankTileTap(tile);
    }
  };

  // Tap on placed tile:
  // - If correct: opens instant dictionary tooltip
  // - If pending/wrong: returns tile back to bank
  const handlePlacedTileTap = (tile: Tile) => {
    if (orderStatus === 'correct') {
      handleWordTap(tile.word);
      return;
    }
    setPlaced((prevPlaced) => {
      const nextPlaced = prevPlaced.filter((t) => t.id !== tile.id);
      checkOrder(nextPlaced);
      return nextPlaced;
    });
    setBank((prevBank) => (prevBank.some((t) => t.id === tile.id) ? prevBank : [...prevBank, tile]));
  };

  // Record layout coordinate of each placed tile
  const handleTileLayout = (id: number, x: number, width: number) => {
    tilePositionsRef.current[id] = { x, width, centerX: x + width / 2 };
  };

  const handleTileDragStart = () => {
    measureArena();
  };

  // As finger moves inside sentence arena, calculate target gap index
  const handleTileDragMove = (tileId: number, dx: number) => {
    const ownPos = tilePositionsRef.current[tileId];
    if (!ownPos) return;

    const currentCenterX = ownPos.centerX + dx;
    const otherTiles = placed.filter((t) => t.id !== tileId);

    let targetIdx = 0;
    for (const other of otherTiles) {
      const pos = tilePositionsRef.current[other.id];
      if (pos && currentCenterX > pos.centerX) {
        targetIdx++;
      }
    }
    setDragHoverIndex(targetIdx);
  };

  // On release, insert dragged placed tile exactly at targetIdx!
  const handleTileDragEnd = (tileId: number, dx: number) => {
    const ownPos = tilePositionsRef.current[tileId];
    setDragHoverIndex(null);

    setPlaced((prevPlaced) => {
      const draggedTile = prevPlaced.find((t) => t.id === tileId);
      if (!draggedTile) return prevPlaced;

      const otherTiles = prevPlaced.filter((t) => t.id !== tileId);
      if (ownPos) {
        const currentCenterX = ownPos.centerX + dx;
        let targetIdx = 0;
        for (const other of otherTiles) {
          const pos = tilePositionsRef.current[other.id];
          if (pos && currentCenterX > pos.centerX) {
            targetIdx++;
          }
        }
        const clampedIdx = Math.max(0, Math.min(targetIdx, otherTiles.length));
        const nextPlaced = [
          ...otherTiles.slice(0, clampedIdx),
          draggedTile,
          ...otherTiles.slice(clampedIdx),
        ];
        checkOrder(nextPlaced);
        return nextPlaced;
      }

      return prevPlaced;
    });
  };

  const handleResetOrder = () => {
    if (activeScene) {
      setBank(tilesFromSentence(activeScene.sentence_en));
      setPlaced([]);
      setOrderStatus('pending');
      setDragHoverIndex(null);
      tilePositionsRef.current = {};
    }
  };

  const handleNextScene = () => {
    if (sceneIdx < scenes.length - 1) {
      startScene(sceneIdx + 1);
    } else {
      setCurrentStep('speaking');
    }
  };

  // Word Click in Solved Sentence: Opens Instant Dynamic Tooltip Popover!
  const handleWordTap = async (rawWord: string) => {
    const clean = cleanWord(rawWord).toLowerCase();
    if (!clean) return;
    pronounce(clean, { rate: audioSpeed === 0.75 ? 0.68 : 0.95 }).catch(() => {});

    const localMeaning = QUICK_GLOSSARY[clean];

    setTooltipWord({
      raw: rawWord,
      clean,
      meaning: localMeaning || 'Çeviri getiriliyor…',
      loading: !localMeaning,
    });

    try {
      const res = await api.get<VocabLookupOut>(
        `/vocab-cards/lookup?term=${encodeURIComponent(clean)}`
      );
      setTooltipWord((prev) =>
        prev && prev.clean === clean
          ? {
              ...prev,
              meaning: res.translation || localMeaning || clean,
              phonetic: res.phonetic || undefined,
              pos: res.part_of_speech || undefined,
              loading: false,
            }
          : prev
      );
    } catch {
      setTooltipWord((prev) =>
        prev && prev.clean === clean
          ? {
              ...prev,
              meaning: localMeaning || (clean.endsWith('ing') ? 'eylem / yapma hali' : clean),
              loading: false,
            }
          : prev
      );
    }
  };

  // Add Word from Tooltip directly into Kelime Sandığı
  const handleSaveTooltipWord = async () => {
    if (!tooltipWord || !passage || !activeScene) return;
    const term = tooltipWord.clean;
    try {
      const payload: VocabCardCreate = {
        term,
        translation: tooltipWord.meaning,
        example_sentence: activeScene.sentence_en,
        cefr_level: passage.cefr_level ?? 'A1',
        part_of_speech: 'noun',
        source_label: passage.title,
      };
      await api.post('/vocab-cards', payload);
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
      showToast(`“${term}” Kelime Sandığına eklendi! 📦✨`);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'Kelime kaydedilemedi');
    } finally {
      setTooltipWord(null);
    }
  };

  const handleFinishReading = async () => {
    setCelebrationVisible(true);
    try {
      await api.post(`/reading/${slug}/complete`);
      track('reading_passage_completed', { slug });
      queryClient.invalidateQueries({ queryKey: ['reading', 'completed'] });
    } catch {
      // Non-fatal
    }
  };

  const handleMicPress = async () => {
    if (isRecording) {
      await stopRecording();
      handleFinishReading();
    } else {
      await start();
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator style={styles.stateBlock} color={colors.brand} />
      </SafeAreaView>
    );
  }

  if (isError || !passage || !activeScene) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Ionicons name="chevron-back" size={24} color={colors.textHeading} />
          </Pressable>
        </View>
        <View style={styles.stateBlock}>
          <Text style={styles.stateText}>Okuma parçası yüklenemedi.</Text>
          <Pressable onPress={() => refetch()}>
            <Text style={styles.retryText}>Tekrar dene</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const sceneImage = readingSceneImages[activeScene.image_key] ?? companionImage;

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.headerBackBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.textHeading} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {passage.title}
          </Text>
          <Text style={styles.headerLevel}>
            {passage.cefr_level ? `${passage.cefr_level} • ` : ''}⏱️ {passage.estimated_minutes} Dk
          </Text>
        </View>
        <View style={styles.stepIndicatorPill}>
          <Text style={styles.stepIndicatorText}>
            {currentStep === 'scene' ? `Sahne ${sceneIdx + 1}/${scenes.length}` : 'Yankı Ses'}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ======================================================== */}
        {/* SAHNE: DİNLE + CÜMLEYİ SIRALA (Unified Single Card)      */}
        {/* ======================================================== */}
        {currentStep === 'scene' && (
          <View style={styles.stepContainer}>
            {/* 1. Scene 3D Illustration Card */}
            <View style={[styles.sceneImageCard, shadow.card]}>
              <Image
                source={sceneImage}
                style={styles.sceneImage}
                resizeMode={sceneImage === companionImage ? 'contain' : 'cover'}
              />
              <View style={styles.sceneBadge}>
                <Text style={styles.sceneBadgeText}>{activeScene.title}</Text>
              </View>
            </View>

            {/* 2. Voice Audio Bar */}
            <View style={styles.audioControlsRow}>
              <Pressable
                onPress={() =>
                  toggle(activeScene.sentence_en, {
                    rate: audioSpeed === 0.75 ? 0.68 : 0.95,
                  })
                }
                style={[
                  styles.playAudioButton,
                  isPlaying && !isPaused && styles.playAudioButtonActive,
                ]}
              >
                <Ionicons
                  name={
                    isPlaying && !isPaused
                      ? 'pause-circle'
                      : isPaused
                        ? 'play-circle'
                        : 'volume-medium-outline'
                  }
                  size={20}
                  color="#FFFFFF"
                />
                <Text style={styles.playAudioText}>
                  {isPlaying && !isPaused
                    ? '⏸️ Duraklat'
                    : isPaused
                      ? '▶️ Devam Et'
                      : '🔊 Sahneyi Dinle'}
                </Text>
              </Pressable>

              {/* Stop & Reset Audio Button */}
              {isPlaying || isPaused ? (
                <Pressable onPress={stopAudio} style={styles.stopAudioButton} hitSlop={8}>
                  <Ionicons name="stop-circle" size={18} color="#EF4444" />
                </Pressable>
              ) : null}

              {/* Speed Selector (1.0x vs 0.75x) */}
              <Pressable
                onPress={() => {
                  const newSpeed = audioSpeed === 1.0 ? 0.75 : 1.0;
                  setAudioSpeed(newSpeed);
                  if (isPlaying) {
                    stopAudio();
                    pronounce(activeScene.sentence_en, {
                      rate: newSpeed === 0.75 ? 0.68 : 0.95,
                    });
                  }
                }}
                style={[
                  styles.speedToggleButton,
                  audioSpeed === 0.75 && styles.speedToggleButtonSlow,
                ]}
              >
                <Text
                  style={[
                    styles.speedToggleText,
                    audioSpeed === 0.75 && styles.speedToggleTextSlow,
                  ]}
                >
                  {audioSpeed === 0.75 ? '🐢 0.75x' : '⚡ 1.0x'}
                </Text>
              </Pressable>
            </View>

            {/* 3. UNIFIED EXERCISE CARD (Clean, single card for puzzle & solution) */}
            <View
              style={[
                styles.unifiedCard,
                shadow.card,
                orderStatus === 'correct' && styles.unifiedCardCorrect,
                orderStatus === 'wrong' && styles.unifiedCardWrong,
              ]}
            >
              {/* Header inside card */}
              <View style={styles.cardHeaderRow}>
                <View style={styles.cardHeaderLeft}>
                  <Text
                    style={[
                      styles.cardHeaderTitle,
                      orderStatus === 'correct' && styles.cardHeaderTitleCorrect,
                    ]}
                  >
                    {orderStatus === 'correct'
                      ? '💡 Kelimelere Dokun & Öğren:'
                      : '🧩 Sürükle ve Sıraya Diz:'}
                  </Text>
                  {orderStatus === 'pending' && (
                    <Text style={styles.cardHeaderSub}>
                      Kelimeleri havuzdan çekip istediğin araya bırakabilirsin.
                    </Text>
                  )}
                </View>

                {orderStatus === 'correct' ? (
                  <View style={styles.successBadge}>
                    <Ionicons name="checkmark-circle" size={16} color="#059669" />
                    <Text style={styles.successBadgeText}>Harika, Doğru! 🎉</Text>
                  </View>
                ) : placed.length > 0 ? (
                  <Pressable onPress={handleResetOrder} hitSlop={8}>
                    <Text style={styles.resetOrderLink}>↺ Sıfırla</Text>
                  </Pressable>
                ) : null}
              </View>

              {/* Sentence Arena with Fluid Drag & Drop */}
              <View
                ref={arenaRef}
                onLayout={measureArena}
                style={[
                  styles.sentenceArena,
                  orderStatus === 'correct' && styles.sentenceArenaCorrect,
                ]}
              >
                {placed.length === 0 ? (
                  <Text style={styles.arenaPlaceholder}>
                    Aşağıdaki kelimelerden dokun veya buraya sürükle…
                  </Text>
                ) : (
                  <View style={styles.placedRow}>
                    {placed.map((tile, idx) => (
                      <View key={tile.id} style={styles.tileSlotWrapper}>
                        {/* Glowing Drop Indicator Bar before tile if hovering here */}
                        {dragHoverIndex === idx && orderStatus !== 'correct' && (
                          <View style={styles.dropIndicatorBar} />
                        )}

                        <DraggableSentenceTile
                          tile={tile}
                          isCorrect={orderStatus === 'correct'}
                          onLayout={handleTileLayout}
                          onDragStart={handleTileDragStart}
                          onDragMove={handleTileDragMove}
                          onDragEnd={handleTileDragEnd}
                          onTap={handlePlacedTileTap}
                        />
                      </View>
                    ))}

                    {/* Glowing Drop Indicator at the end */}
                    {dragHoverIndex === placed.length && orderStatus !== 'correct' && (
                      <View style={styles.dropIndicatorBar} />
                    )}
                  </View>
                )}

                {/* Subtitle Turkish Translation inside the SAME card once solved */}
                {orderStatus === 'correct' && (
                  <View style={styles.unifiedTrSubtitle}>
                    <Text style={styles.unifiedTrText}>🇹🇷 {activeScene.sentence_tr}</Text>
                  </View>
                )}
              </View>

              {/* Status Notice if Wrong */}
              {orderStatus === 'wrong' && (
                <View style={styles.wrongFeedbackRow}>
                  <Ionicons name="close-circle" size={16} color={colors.error} />
                  <Text style={styles.wrongFeedbackText}>
                    Sıra yanlış — kelimeleri sürükleyerek istediğin araya taşıyabilirsin!
                  </Text>
                </View>
              )}

              {/* Instant Dynamic Dictionary Tooltip Popover */}
              {tooltipWord && (
                <View style={[styles.wordTooltipBox, shadow.card]}>
                  <View style={styles.tooltipHeaderRow}>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <Text style={styles.tooltipWordTitle}>“{tooltipWord.clean}”</Text>
                        {tooltipWord.phonetic ? (
                          <Text style={styles.tooltipPhoneticText}>{tooltipWord.phonetic}</Text>
                        ) : null}
                        {tooltipWord.pos ? (
                          <View style={styles.tooltipPosBadge}>
                            <Text style={styles.tooltipPosText}>{tooltipWord.pos}</Text>
                          </View>
                        ) : null}
                      </View>
                      <Text style={styles.tooltipMeaningText}>
                        {tooltipWord.loading ? '⏳ Sözlükten sorgulanıyor…' : `🇹🇷 ${tooltipWord.meaning}`}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() =>
                        pronounce(tooltipWord.clean, {
                          rate: audioSpeed === 0.75 ? 0.68 : 0.95,
                        })
                      }
                      style={styles.tooltipSoundBtn}
                    >
                      <Ionicons name="volume-high" size={16} color={colors.brand} />
                    </Pressable>
                  </View>

                  <View style={styles.tooltipActionsRow}>
                    <Pressable onPress={handleSaveTooltipWord} style={styles.tooltipSaveBtn}>
                      <Ionicons name="add-circle" size={15} color="#FFFFFF" />
                      <Text style={styles.tooltipSaveBtnText}>Sandığıma Ekle</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setTooltipWord(null)}
                      style={styles.tooltipDismissBtn}
                    >
                      <Text style={styles.tooltipDismissText}>Kapat</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>

            {/* 4. WORD BANK (Only shown during puzzle mode) */}
            {orderStatus !== 'correct' && (
              <View style={styles.bankContainer}>
                <Text style={styles.bankSectionTitle}>
                  Kelimeler (Dokun veya Yukarı Sürükle):
                </Text>
                <View style={styles.bankRow}>
                  {bank.map((tile) => (
                    <DraggableBankTile
                      key={tile.id}
                      tile={tile}
                      onDragMoveUp={handleBankTileDragMoveUp}
                      onDragEndUp={handleBankTileDragEndUp}
                      onTap={handleBankTileTap}
                    />
                  ))}
                </View>

                {/* Hint Button */}
                <View style={styles.hintRow}>
                  <Pressable onPress={() => setShowHint((h) => !h)} style={styles.hintButton}>
                    <Ionicons name="bulb-outline" size={16} color={colors.brand} />
                    <Text style={styles.hintButtonText}>
                      {showHint ? 'İpucunu Gizle' : 'Türkçe İpucu'}
                    </Text>
                  </Pressable>
                </View>

                {showHint && (
                  <View style={styles.trHintBox}>
                    <Text style={styles.trHintLabel}>🇹🇷 İPUCU:</Text>
                    <Text style={styles.trHintText}>{activeScene.sentence_tr}</Text>
                  </View>
                )}
              </View>
            )}

            {/* 5. NEXT SCENE BUTTON */}
            {orderStatus === 'correct' && (
              <View style={styles.nextSceneContainer}>
                <Button
                  label={
                    sceneIdx < scenes.length - 1
                      ? 'Sonraki Sahneye Geç ➔'
                      : '🎙️ Yankı ile Konuşma Köprüsü'
                  }
                  onPress={handleNextScene}
                  style={{ width: '100%' }}
                />
              </View>
            )}
          </View>
        )}

        {/* ======================================================== */}
        {/* YANKI SES VE SHADOWING KÖPRÜSÜ                           */}
        {/* ======================================================== */}
        {currentStep === 'speaking' && (
          <View style={styles.stepContainer}>
            <View style={[styles.speakingCard, shadow.card]}>
              <Image source={companionImage} style={styles.yankiAvatar} resizeMode="contain" />
              <Text style={styles.yankiAskTitle}>Yankı Seni Dinliyor 🎙️</Text>
              <Text style={styles.yankiAskQuestion}>
                &ldquo;
                {passage.speaking_prompt?.yanki_ask || 'Can you summarize what happened?'}
                &rdquo;
              </Text>

              <View style={styles.expectedBox}>
                <Text style={styles.expectedLabel}>ÖRNEK CEVAP VEYA SHADOWING:</Text>
                <Text style={styles.expectedText}>
                  {passage.speaking_prompt?.expected_answer || scenes[0]?.sentence_en}
                </Text>
              </View>

              <View style={styles.waveformWrap}>
                <Waveform active={isRecording} meteringDb={meteringDb} />
              </View>

              {permissionDenied ? (
                <MicPermissionPrompt onRequestPermission={() => {}} />
              ) : (
                <Pressable
                  onPress={handleMicPress}
                  style={[styles.micBigButton, isRecording && styles.micBigButtonActive]}
                >
                  <Ionicons name={isRecording ? 'stop' : 'mic'} size={28} color="#FFFFFF" />
                  <Text style={styles.micBigButtonText}>
                    {isRecording ? 'Konuşmayı Bitir' : 'Mikrofona Bas & Konuş'}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* ======================================================== */}
      {/* 🎉 CELEBRATION MODAL (PUAN & ELMAS KUTLAMASI)             */}
      {/* ======================================================== */}
      <Modal
        visible={celebrationVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setCelebrationVisible(false)}
      >
        <View style={styles.celebrationOverlay}>
          <View style={[styles.celebrationCard, shadow.card]}>
            <Image
              source={stateImages.goalCelebration}
              style={styles.celebrationImage3D}
              resizeMode="contain"
            />

            <Text style={styles.celebrationTitle}>Tebrikler! Hikaye Bitti 🎉</Text>
            <Text style={styles.celebrationSub}>
              &ldquo;{passage.title}&rdquo; parçasını başarıyla dinledin, sıraladın ve seslendirdin!
            </Text>

            {/* Reward Badge Row — no hardcoded number (backend's real
                READING_COMPLETION_XP doesn't match what used to be printed
                here), and no "Elmas" badge (that currency was removed app-
                wide — it was never actually awarded anyway). */}
            <View style={styles.rewardBadgesRow}>
              <View style={styles.rewardBadge}>
                <Image
                  source={stateImages.xpBolt}
                  style={styles.rewardBadgeIcon}
                  resizeMode="contain"
                />
                <Text style={styles.rewardBadgeNumber}>Gerçek XP ⚡</Text>
                <Text style={styles.rewardBadgeLabel}>Kazandın</Text>
              </View>
            </View>

            <Button
              label="Harika! Hikaye Listesine Dön ➔"
              onPress={() => {
                setCelebrationVisible(false);
                navigation.goBack();
              }}
              style={{ width: '100%', marginTop: 8 }}
            />
          </View>
        </View>
      </Modal>

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  stateBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  stateText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
  },
  retryText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.brand,
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.8)',
  },
  headerBackBtn: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: 8,
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
  },
  headerLevel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  stepIndicatorPill: {
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  stepIndicatorText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.brand,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 40,
  },
  stepContainer: {
    gap: 12,
  },
  sceneImageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    position: 'relative',
  },
  sceneImage: {
    width: '100%',
    height: 180,
  },
  sceneBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  sceneBadgeText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#FFFFFF',
  },

  /* Audio Controls Row */
  audioControlsRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  playAudioButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingVertical: 10,
    borderRadius: radii.pill,
    gap: 6,
  },
  playAudioButtonActive: {
    backgroundColor: '#3B82F6',
  },
  playAudioText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  stopAudioButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    padding: 10,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  speedToggleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radii.pill,
  },
  speedToggleButtonSlow: {
    borderColor: '#F59E0B',
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
  },
  speedToggleText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  speedToggleTextSlow: {
    color: '#D97706',
  },

  /* Unified Single Card */
  unifiedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  unifiedCardCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  unifiedCardWrong: {
    borderColor: 'rgba(239, 68, 68, 0.5)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardHeaderLeft: {
    flex: 1,
    marginRight: 8,
  },
  cardHeaderTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  cardHeaderTitleCorrect: {
    color: '#065F46',
  },
  cardHeaderSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  resetOrderLink: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.brand,
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
    gap: 4,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  successBadgeText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#047857',
  },

  /* Sentence Arena */
  sentenceArena: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 12,
    minHeight: 64,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    borderStyle: 'dashed',
    justifyContent: 'center',
  },
  sentenceArenaCorrect: {
    backgroundColor: '#FFFFFF',
    borderColor: '#86EFAC',
    borderStyle: 'solid',
    shadowColor: '#10B981',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  arenaPlaceholder: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  placedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
  },
  tileSlotWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropIndicatorBar: {
    width: 3,
    height: 32,
    backgroundColor: colors.brand,
    borderRadius: 2,
    marginHorizontal: 3,
  },
  unifiedTrSubtitle: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  unifiedTrText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },
  wrongFeedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  wrongFeedbackText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.error,
    flex: 1,
  },

  /* Word Chips */
  placedChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.brand,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  placedChipCorrect: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
    borderWidth: 1.5,
  },
  placedChipText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  placedChipTextCorrect: {
    color: '#047857',
    fontWeight: 'bold',
  },
  draggingPlacedChip: {
    opacity: 0.85,
    zIndex: 99,
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  bankChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
    elevation: 1,
  },
  bankChipText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  draggingBankChip: {
    opacity: 0.85,
    zIndex: 99,
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },

  /* Bank Container */
  bankContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  bankSectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 8,
  },
  bankRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 10,
  },
  hintRow: {
    alignItems: 'center',
    marginTop: 4,
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(79, 70, 229, 0.06)',
  },
  hintButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.brand,
  },
  trHintBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 10,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.brand,
  },
  trHintLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
    marginBottom: 2,
  },
  trHintText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
  },

  /* Tooltip inside card */
  wordTooltipBox: {
    backgroundColor: '#0F172A',
    borderRadius: radii.md,
    padding: 10,
    marginTop: 10,
  },
  tooltipHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tooltipWordTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  tooltipPhoneticText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: '#38BDF8',
  },
  tooltipPosBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.25)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
  },
  tooltipPosText: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#A5B4FC',
  },
  tooltipMeaningText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#CBD5E1',
    marginTop: 2,
  },
  tooltipSoundBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 6,
    borderRadius: radii.pill,
  },
  tooltipActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tooltipSaveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingVertical: 6,
    borderRadius: radii.pill,
    gap: 4,
  },
  tooltipSaveBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  tooltipDismissBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipDismissText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#CBD5E1',
  },
  nextSceneContainer: {
    marginTop: 4,
  },

  /* Speaking Step */
  speakingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  yankiAvatar: {
    width: 72,
    height: 72,
    marginBottom: 10,
  },
  yankiAskTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
    marginBottom: 4,
  },
  yankiAskQuestion: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.brand,
    textAlign: 'center',
    marginBottom: 12,
  },
  expectedBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 10,
    width: '100%',
    borderLeftWidth: 3,
    borderLeftColor: colors.brand,
    marginBottom: 12,
  },
  expectedLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textMuted,
    marginBottom: 2,
  },
  expectedText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
  },
  waveformWrap: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
  },
  micBigButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: radii.pill,
    gap: 8,
    width: '100%',
    marginTop: 8,
  },
  micBigButtonActive: {
    backgroundColor: colors.error,
  },
  micBigButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#FFFFFF',
  },

  /* Celebration Modal */
  celebrationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  celebrationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  celebrationImage3D: {
    width: 96,
    height: 96,
    marginBottom: 10,
  },
  celebrationTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
    marginBottom: 4,
    textAlign: 'center',
  },
  celebrationSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 12,
  },
  rewardBadgesRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginBottom: 12,
  },
  rewardBadge: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  rewardBadgeIcon: {
    width: 32,
    height: 32,
    marginBottom: 4,
  },
  rewardBadgeNumber: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.brand,
  },
  rewardBadgeLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
  },
});
