import { Platform } from 'react-native';

import { saveWidgetSnapshot, WIDGET_NAME, type WidgetSnapshot } from './widgetData';

let lastJson = '';

/** Saves what the widget should show and redraws it if it is on the home screen (Android only, best effort). */
export async function updateHomeWidget(snapshot: WidgetSnapshot): Promise<void> {
  if (Platform.OS !== 'android') return;
  const json = JSON.stringify(snapshot);
  if (json === lastJson) return;
  lastJson = json;
  await saveWidgetSnapshot(snapshot);
  try {
    // Loaded lazily: the library throws at import time in a build that does not include its native module yet.
    const [{ requestWidgetUpdate }, { SpekviaWidget }] = await Promise.all([
      import('react-native-android-widget'),
      import('./SpekviaWidget'),
    ]);
    await requestWidgetUpdate({ widgetName: WIDGET_NAME, renderWidget: (info) => <SpekviaWidget snapshot={snapshot} height={info.height} /> });
  } catch {
    // An older build without the widget module: nothing to redraw.
  }
}

// ---- "Open my next step" request coming from a widget tap (spekvia://next) ----

let nextStepPending = false;
const listeners = new Set<() => void>();

export function requestOpenNextStep(): void {
  nextStepPending = true;
  listeners.forEach((listener) => listener());
}

/** True once per widget tap; Home calls it when it is ready to start the step. */
export function takeOpenNextStepRequest(): boolean {
  const pending = nextStepPending;
  nextStepPending = false;
  return pending;
}

export function onOpenNextStepRequest(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
