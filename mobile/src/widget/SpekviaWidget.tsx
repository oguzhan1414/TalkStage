import { FlexWidget, ImageWidget, TextWidget } from 'react-native-android-widget';

import { WIDGET_NEXT_STEP_URI, type WidgetSnapshot } from './widgetData';

const MIVO_WAIT = require('../../assets/images/widget/mivo_wait.png');
const MIVO_HAPPY = require('../../assets/images/widget/mivo_happy.png');

/**
 * The small (2×2) widget is a day counter: Mivo, the streak as a big number and one short line under it.
 * Open today: waiting Mivo and "gün serisi" (or "Seriyi başlat" at 0). Practiced today: happy Mivo in a green ring
 * and a green "Bugün ✓". A tap anywhere opens the next step. Sizes follow the widget's real height, because launchers
 * differ in how tall a 2×2 cell is (a fixed layout was cut off at the bottom on one phone).
 */
export function SpekviaWidget({ snapshot, height }: { snapshot: WidgetSnapshot | null; height?: number }) {
  const h = height && height > 0 ? height : 140;
  const mivo = Math.max(38, Math.min(64, Math.round(h * 0.38)));
  const number = Math.max(20, Math.min(30, Math.round(h * 0.2)));
  const done = snapshot?.todayDone ?? false;
  const streak = snapshot?.streak ?? 0;
  const line = !snapshot ? 'Spekvia' : done ? snapshot.doneLabel : streak > 0 ? snapshot.streakLabel : snapshot.startLabel;
  const lineColor = done ? '#059669' : streak > 0 ? '#6B7280' : '#4F46E5';
  return (
    <FlexWidget
      clickAction="OPEN_URI"
      clickActionData={{ uri: WIDGET_NEXT_STEP_URI }}
      accessibilityLabel={`Spekvia: ${streak} · ${line}`}
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        paddingHorizontal: 8,
        paddingVertical: 6,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGap: 2,
      }}
    >
      <FlexWidget
        style={{
          width: mivo + 6,
          height: mivo + 6,
          borderRadius: (mivo + 6) / 2,
          backgroundColor: done ? '#10B981' : '#EEF2FF',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageWidget image={done ? MIVO_HAPPY : MIVO_WAIT} imageWidth={mivo} imageHeight={mivo} radius={mivo / 2} />
      </FlexWidget>
      <TextWidget
        text={`🔥 ${streak}`}
        maxLines={1}
        allowFontScaling={false}
        style={{ fontSize: number, fontWeight: 'bold', color: '#EA580C' }}
      />
      <TextWidget
        text={line}
        maxLines={1}
        truncate="END"
        allowFontScaling={false}
        style={{ fontSize: 11, fontWeight: 'bold', color: lineColor }}
      />
    </FlexWidget>
  );
}
