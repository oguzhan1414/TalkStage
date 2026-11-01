import { tr } from "@/i18n/shared";

/** The level stories shown on the home page, from mobile/src/data/path/{a1,a2,b1,b2,c1}.ts (C2 is only planned). */

export type Volume = {
  id: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  name: string;
  color: string;
  /** Text colour on the spine (amber needs dark ink). */
  ink: string;
  story?: { title: string; blurb: string; cover: string; units: number; episodes: number };
};

export const VOLUMES: Volume[] = [
  {
    id: "A1",
    name: "Beginner",
    color: "var(--color-vol-a1)",
    ink: "#fff",
    story: {
      title: tr("Maya'nın yeni şehri"),
      blurb: tr("Maya Bristol'a taşınıyor. Kapısının altına tek kelimelik kartpostallar bırakılıyor. Kim gönderiyor?"),
      cover: "/story/a1-e14.webp",
      units: 9,
      episodes: 36,
    },
  },
  {
    id: "A2",
    name: "Elementary",
    color: "var(--color-vol-a2)",
    ink: "#fff",
    story: {
      title: tr("Dün ve bugün"),
      blurb: tr("Bay Patel'in eski fotoğraf makinesinden kırk yıllık bir film çıkıyor. Maya aynı yerleri bugün çekip bir sergi açacak. Peki fotoğraflardaki fırıncı kim?"),
      cover: "/story/a2-e01.webp",
      units: 9,
      episodes: 36,
    },
  },
  {
    id: "B1",
    name: "Intermediate",
    color: "var(--color-vol-b1)",
    ink: "#fff",
    story: {
      title: tr("Kafeyi kurtar"),
      blurb: tr("Ev sahibi kirayı ikiye katladı ve Rosa'nın kafesi kapanabilir. Mahalle bir araya gelip kafeyi kurtarabilecek mi?"),
      cover: "/story/b1-e01.webp",
      units: 9,
      episodes: 36,
    },
  },
  {
    id: "B2",
    name: "Upper-Intermediate",
    color: "var(--color-vol-b2)",
    ink: "#fff",
    story: {
      title: tr("Bristol'un gizli tarihi"),
      blurb: tr("Kafenin tadilatında duvar kâğıdının arkasından küçük bir kapı çıkıyor. Arkasında kaçakçıların limana inen tüneli var. Bu sırada Maya'ya Londra'dan bir iş teklifi geliyor."),
      cover: "/story/b2-e01.webp",
      units: 9,
      episodes: 36,
    },
  },
  {
    id: "C1",
    name: "Advanced",
    color: "var(--color-vol-c1)",
    ink: "#231e66",
    story: {
      title: tr("Haber merkezi"),
      blurb: tr("Galadan bir yıl sonra Leo, Ana'nın gazetesinde çalışıyor. İsimsiz bir zarf geliyor: belediye limanı sessizce bir inşaat şirketine satmak üzere. Bay Patel arşivden 1952 tarihli bir tüzük çıkarıyor."),
      cover: "/story/c1-e01.webp",
      units: 6,
      episodes: 24,
    },
  },
  { id: "C2", name: "Proficiency", color: "var(--color-vol-c2)", ink: "#fff" },
];
