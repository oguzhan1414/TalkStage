import Image from "next/image";
import { BookOpen, Check, Clapperboard, Flame, House, Mic, User } from "lucide-react";
import { tr, type TFunction } from "@/i18n/shared";

/**
 * Four app screens rebuilt in HTML from the app's own art and copy (path home, a reading episode, the kitchen word
 * room, a Mivo scene). They stand in until real screenshots replace them.
 */

const TABS = [
  { Icon: House, label: tr("Bugün") },
  { Icon: Clapperboard, label: tr("Sahneler") },
  { Icon: BookOpen, label: tr("Kelimeler") },
  { Icon: User, label: tr("Profil") },
];

export function HomeScreen({ t }: { t: TFunction }) {
  return (
    <div className="relative flex h-full flex-col text-[#0f172a]">
      <Image src="/story/home-a1.webp" alt="" fill sizes="280px" className="object-cover" />
      <div className="relative z-10 mx-3 mt-9 flex items-center gap-2 rounded-full bg-white/80 px-2.5 py-1.5 shadow-sm">
        <span className="grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-[#eef2ff] ring-2 ring-white">
          <Image src="/mivo/idle.webp" alt="" width={24} height={29} className="mt-1.5 h-6 w-auto" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex justify-between text-[0.5rem] font-bold">
            <span>{t("Günlük hedef")}</span>
            <span className="text-[#475569]">4/10</span>
          </span>
          <span className="mt-0.5 block h-1 overflow-hidden rounded-full bg-slate-300/50">
            <span className="block h-full w-2/5 rounded-full bg-[#22c55e]" />
          </span>
        </span>
        <span className="flex items-center gap-0.5 text-[0.62rem] font-bold">
          <Flame aria-hidden className="h-3 w-3 fill-orange-400 text-orange-500" />5
        </span>
      </div>

      <div className="relative z-10 mt-auto flex flex-col items-center px-4 pb-3 text-center">
        <span className="rounded-full bg-white/60 px-2.5 py-0.5 text-[0.55rem] font-bold tracking-wide text-[#3730a3]">{t("Ünite {{n}}", { n: 1 })}</span>
        <div className="relative mt-2 h-28 w-28 overflow-hidden rounded-full shadow-lg ring-4 ring-white">
          <Image src="/story/a1-e01.webp" alt="" fill sizes="112px" className="scale-[1.12] object-cover" />
        </div>
        <p className="mt-2.5 font-display text-[0.95rem] font-extrabold leading-tight">{t("Bristol'a hoş geldin")}</p>
        <p className="mt-0.5 text-[0.55rem] font-semibold text-[#475569]">I am / You are · {t("~{{n}} dk", { n: 4 })}</p>
        <span className="mt-2.5 w-full rounded-2xl bg-[#4f46e5] py-2 text-[0.7rem] font-bold text-white shadow-md">{t("Başla")}</span>
      </div>

      <TabBar t={t} />
    </div>
  );
}

function TabBar({ t }: { t: TFunction }) {
  return (
    <div className="relative z-10 grid grid-cols-4 border-t border-slate-200/70 bg-white/95 px-1 pb-3 pt-1.5">
      {TABS.map(({ Icon, label }, i) => (
        <span key={label} className={`flex flex-col items-center gap-0.5 text-[0.45rem] font-semibold ${i === 0 ? "text-[#4f46e5]" : "text-slate-400"}`}>
          <Icon aria-hidden className="h-3.5 w-3.5" />
          {t(label)}
        </span>
      ))}
    </div>
  );
}

export function LessonScreen({ t }: { t: TFunction }) {
  const lines: [string, React.ReactNode][] = [
    ["Maya", "Hello! I am Maya."],
    ["Leo", "Hi! You are Maya!"],
    ["Leo", "You are tired, Maya."],
    [
      "Maya",
      <>
        I <mark className="rounded-sm bg-[#ffc21f] px-0.5 text-inherit">am</mark> tired, but I <mark className="rounded-sm bg-[#ffc21f] px-0.5 text-inherit">am</mark> happy!
      </>,
    ],
  ];
  return (
    <div className="flex h-full flex-col bg-white px-4 pb-4 pt-9 text-[#0f172a]">
      <div className="flex gap-1">
        <span className="h-1 flex-1 rounded-full bg-[#4f46e5]" />
        <span className="h-1 flex-1 rounded-full bg-[#4f46e5]/40" />
        <span className="h-1 flex-1 rounded-full bg-slate-200" />
      </div>
      <div className="mt-3 flex items-center gap-2.5">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[#ffe48f]">
          <Image src="/story/a1-e01.webp" alt="" fill sizes="44px" className="scale-[1.12] object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-[0.5rem] font-semibold text-slate-500">A1 · {t("Bölüm {{n}}", { n: 1 })}</p>
          <p className="font-display text-[0.78rem] font-extrabold leading-tight">{t("Bristol'a hoş geldin")}</p>
        </div>
      </div>
      <div lang="en" className="mt-4 space-y-2 font-story text-[0.82rem] leading-snug">
        {lines.map(([who, text], i) => (
          <p key={i}>
            <span className="mr-1.5 font-body text-[0.45rem] font-bold uppercase tracking-wide text-slate-400">{who}</span>
            {text}
          </p>
        ))}
      </div>
      <div className="mt-auto rounded-xl bg-[#fff6d6] px-3 py-2.5">
        <p className="font-display text-[0.6rem] font-bold">{t("Kendin ve karşındaki: I am / You are")}</p>
        <p className="mt-0.5 text-[0.52rem] leading-snug text-slate-600">{t("Kendin için I am, karşındaki için you are dersin. Türkçedeki “-ım, -sın” eki İngilizcede ayrı bir kelimedir.")}</p>
      </div>
    </div>
  );
}

const PINS = [
  { x: 8, y: 42 },
  { x: 48, y: 30 },
  { x: 61, y: 11.5 },
  { x: 49, y: 56 },
  { x: 89, y: 62.5 },
];

export function RoomScreen({ t }: { t: TFunction }) {
  return (
    <div className="relative h-full">
      <Image src="/story/kitchen.webp" alt="" fill sizes="280px" className="object-cover" />
      <span className="absolute left-3 top-9 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[0.55rem] font-bold text-[#0f172a]">{t("Kelime odası: mutfak")}</span>
      {PINS.map((p, i) => (
        <span
          key={i}
          aria-hidden
          className={`absolute grid h-5 w-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white shadow ${i === 1 ? "bg-[#ffc21f]" : "bg-[#4f46e5]/85"}`}
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${i === 1 ? "bg-[#231e66]" : "bg-white"}`} />
        </span>
      ))}
      <div className="absolute inset-x-3 bottom-4 z-10 rounded-xl bg-white/95 px-3 py-2 shadow-lg">
        <p lang="en" className="font-story text-[0.95rem] font-medium leading-none text-[#0f172a]">
          kettle
        </p>
        <p className="mt-0.5 text-[0.55rem] text-slate-600">{t("su ısıtıcısı")}</p>
      </div>
    </div>
  );
}

export function MivoScreen({ t }: { t: TFunction }) {
  return (
    <div className="flex h-full flex-col bg-[#1e1b4b] px-3 pb-4 pt-9 text-white">
      <div className="flex flex-col items-center">
        <Image src="/mivo/speaking.webp" alt="" width={750} height={900} sizes="90px" className="h-[5.5rem] w-auto" />
        <span className="mt-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[0.5rem] font-semibold text-indigo-100">
          {t("Mivo, {{name}} rolünde · {{role}}", { name: "Sofia", role: t("Sınıf arkadaşın") })}
        </span>
      </div>
      <div lang="en" className="mt-3 space-y-2 font-story text-[0.68rem] leading-snug">
        <p className="max-w-[88%] rounded-xl rounded-bl-sm bg-white/10 px-2.5 py-1.5">Hi! I&apos;m Sofia. What&apos;s your name?</p>
        <p className="ml-auto max-w-[80%] rounded-xl rounded-br-sm bg-[#4f46e5] px-2.5 py-1.5">I Elif. I from Turkey.</p>
        <div className="ml-auto max-w-[88%] rounded-xl border border-[#ffc21f]/70 bg-[#ffc21f]/15 px-2.5 py-1.5">
          <p className="flex items-center gap-1">
            <Check aria-hidden className="h-3 w-3 text-emerald-300" strokeWidth={3} />
            I&apos;m Elif. I&apos;m from Turkey.
          </p>
        </div>
      </div>
      <div className="mt-auto flex justify-center">
        <span className="relative grid h-12 w-12 place-items-center rounded-full bg-[#ffc21f] text-[#1e1b4b]">
          <span aria-hidden className="mic-ring absolute inset-0 rounded-full bg-[#ffc21f]" />
          <Mic aria-hidden className="relative h-5 w-5" />
        </span>
      </div>
    </div>
  );
}
