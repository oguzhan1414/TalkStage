import type { WidgetTaskHandlerProps } from 'react-native-android-widget';

import { SpekviaWidget } from './SpekviaWidget';
import { agedSnapshot, loadWidgetSnapshot, WIDGET_NAME } from './widgetData';

/**
 * Runs headless (the app may be closed) whenever Android asks the widget to draw: added, periodic update (30 min),
 * resized. It only reads the snapshot the app saved; taps are handled by the widget's OPEN_URI deep link.
 */
export async function widgetTaskHandler(props: WidgetTaskHandlerProps): Promise<void> {
  if (props.widgetInfo.widgetName !== WIDGET_NAME) return;
  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED': {
      const snapshot = await loadWidgetSnapshot();
      props.renderWidget(<SpekviaWidget snapshot={snapshot ? agedSnapshot(snapshot) : null} height={props.widgetInfo.height} />);
      break;
    }
    default:
      break;
  }
}
