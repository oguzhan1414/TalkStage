import { avatarImages } from '../assets/images';
import { t } from '../i18n';

/** The avatars a learner can pick on Profil: a short name, the portrait and its ground colour (used for the ring). */
export const AVATARS = [
  { id: 'campus_girl', name: () => t("Kampüs"), source: avatarImages.campusGirl, tint: '#CDEBDD' },
  { id: 'campus_boy', name: () => t("Kampüs"), source: avatarImages.campusBoy, tint: '#D3E8F6' },
  { id: 'teen', name: () => t("Lise"), source: avatarImages.teen, tint: '#FBE6B5' },
  { id: 'office_woman', name: () => t("Ofis"), source: avatarImages.officeWoman, tint: '#F9D3C8' },
  { id: 'office_man', name: () => t("Plaza"), source: avatarImages.officeMan, tint: '#EFE6D6' },
  { id: 'coder', name: () => t("Kodcu"), source: avatarImages.coder, tint: '#D6DCEB' },
  { id: 'creative', name: () => t("Tasarımcı"), source: avatarImages.creative, tint: '#FADCC9' },
  { id: 'traveler', name: () => t("Gezgin"), source: avatarImages.traveler, tint: '#CDEBDD' },
  { id: 'sporty', name: () => t("Sporcu"), source: avatarImages.sporty, tint: '#D3E8F6' },
  { id: 'chef', name: () => t("Mutfak"), source: avatarImages.chef, tint: '#FBE6B5' },
  { id: 'parent', name: () => t("Ebeveyn"), source: avatarImages.parent, tint: '#F9D3C8' },
  { id: 'senior', name: () => t("Emekli"), source: avatarImages.senior, tint: '#EFE6D6' },
] as const;

export type Avatar = (typeof AVATARS)[number];

/** Older avatar and onboarding persona ids, pointed at the new portraits so nobody's picture goes missing. */
const LEGACY: Record<string, Avatar['id']> = {
  dev: 'coder',
  tech: 'coder',
  lead: 'office_woman',
  entrepreneur: 'office_woman',
  designer: 'creative',
  engineer: 'office_man',
  corporate: 'office_man',
  student: 'campus_girl',
  adult_hobby: 'senior',
  service: 'chef',
};

export function avatarById(id: string | null | undefined): Avatar | undefined {
  if (!id) return undefined;
  const key = LEGACY[id] ?? id;
  return AVATARS.find((a) => a.id === key);
}

/** The learner's avatar: the one picked, else the one matching their onboarding persona, else the first. */
export function avatarFor(profile: { avatar_id?: string | null; persona_id?: string | null } | undefined): Avatar {
  return avatarById(profile?.avatar_id) ?? avatarById(profile?.persona_id) ?? AVATARS[0];
}
