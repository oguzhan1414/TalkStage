import { t } from '../i18n';

/**
 * Spekvia's character cast (images/kadro, flat 2D style): the story's main people, each with one main colour.
 * The story lines show the speaker's face next to the line; other speakers get initials in a neutral colour.
 */
export type CastMember = { name: string; color: string; face?: number; talk?: number; bio?: () => string };

export const CAST: Record<string, CastMember> = {
  Maya: {
    name: 'Maya',
    color: '#F26B4E',
    face: require('../../assets/images/cast/maya.webp'),
    talk: require('../../assets/images/cast/maya_talk.webp'),
    bio: () => t("Bristol'a yeni taşındı. Meraklı, iyimser, biraz sakar."),
  },
  Leo: {
    name: 'Leo',
    color: '#2BB673',
    face: require('../../assets/images/cast/leo.webp'),
    talk: require('../../assets/images/cast/leo_talk.webp'),
    bio: () => t("Ev arkadaşı ve müzisyen. Şakacı, hep geç kalıyor."),
  },
  Rosa: {
    name: 'Rosa',
    color: '#E23D4F',
    face: require('../../assets/images/cast/rosa.webp'),
    talk: require('../../assets/images/cast/rosa_talk.webp'),
    bio: () => t("Alt kattaki kafenin sahibi. Neşeli, cömert, biraz otoriter."),
  },
  Tom: {
    name: 'Tom',
    color: '#E0A800',
    face: require('../../assets/images/cast/tom.webp'),
    talk: require('../../assets/images/cast/tom_talk.webp'),
    bio: () => t("Rosa'nın torunu. Yaramaz, hızlı, her şeyi soruyor."),
  },
  'Mr Patel': {
    name: 'Mr Patel',
    color: '#5B4FE0',
    face: require('../../assets/images/cast/patel.webp'),
    talk: require('../../assets/images/cast/patel_talk.webp'),
    bio: () => t("Yaşlı komşu. Sakin, bilge ve sırlarla dolu."),
  },
  Ana: {
    name: 'Ana',
    color: '#1FA2C4',
    face: require('../../assets/images/cast/ana.webp'),
    talk: require('../../assets/images/cast/ana_talk.webp'),
    bio: () => t("Hırslı bir gazeteci. Keskin zekâlı ve iddialı."),
  },
};

export const CAST_LINEUP = require('../../assets/images/cast/lineup.webp');

/** The cast member for a speaker label, or initials in a neutral colour for everyone else. */
export function castOf(speaker: string): CastMember {
  const known = CAST[speaker];
  if (known) return known;
  return { name: speaker, color: '#94A3B8' };
}

export function initialsOf(name: string): string {
  const parts = name.replace(/^(Mr|Mrs|Ms|Dr|Señor)\s+/i, '').split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] ?? '?').toUpperCase();
}
