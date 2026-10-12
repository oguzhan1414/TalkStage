/**
 * Cookie / analytics consent (client only). Strictly necessary storage (language preference, sign-in session,
 * this choice itself) needs no consent; PostHog analytics runs ONLY after the visitor chose "granted".
 */
export type ConsentChoice = "granted" | "denied";

const KEY = "spekvia.cookie_consent.v1";
/** Fired on `window` whenever the choice changes. */
export const CONSENT_EVENT = "spekvia:consent-changed";
/** Fired by the footer link to re-open the banner. */
export const CONSENT_OPEN_EVENT = "spekvia:consent-open";

export function getConsent(): ConsentChoice | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    // Storage blocked (private mode…): treat as "no consent yet" so analytics stays off.
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(KEY, choice);
  } catch {
    // Not stored: the banner will simply ask again next visit.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function openConsentPreferences() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
