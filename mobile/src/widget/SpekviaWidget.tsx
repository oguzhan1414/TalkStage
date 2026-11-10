import { FlexWidget, ImageWidget, TextWidget } from 'react-native-android-widget';

import { WIDGET_NEXT_STEP_URI, type WidgetSnapshot } from './widgetData';

const MIVO_WAIT = require('../../assets/images/widget/mivo_wait.png');
const MIVO_HAPPY = require('../../assets/images/widget/mivo_happy.png');

/**
 * A small card (2×1 by default): a short line and the streak on the left, Mivo sitting on the bottom edge on the right.
 * Open today: warm card, "Bugünkü adımın hazır" and 🔥 n. Practiced today: mint card, happy Mivo, "Bugün tamam!".
 * Everything is sized from the widget's real size, because launchers differ in how big a cell is (a fixed layout was
 * cut off at the bottom on some phones); a low widget drops the third line instead of clipping it.
 */
export function SpekviaWidget({ snapshot, width, height }: { snapshot: WidgetSnapshot | null; width?: number; height?: number }) {
  const h = height && height > 0 ? height : 80;
  const w = width && width > 0 ? width : 170;
  const done = snapshot?.todayDone ?? false;
  const streak = snapshot?.streak ?? 0;

  const mivo = Math.round(Math.max(40, Math.min(h - 6, w * 0.42, 120)));
  const roomy = h >= 96;
  const number = Math.round(Math.max(18, Math.min(30, h * 0.3)));
  const prompt = !snapshot
    ? 'Spekvia'
    : done
      ? snapshot.donePromptLabel ?? snapshot.doneLabel
      : snapshot.promptLabel ?? 'Spekvia';
  const sub = !snapshot ? '' : done ? snapshot.doneLabel : streak > 0 ? snapshot.streakLabel : snapshot.startLabel;

  return (
    <FlexWidget
      clickAction="OPEN_URI"
      clickActionData={{ uri: WIDGET_NEXT_STEP_URI }}
      accessibilityLabel={`Spekvia: ${prompt} · ${streak}`}
      style={{
        height: 'match_parent',
        width: 'match_parent',
        borderRadius: 22,
        backgroundGradient: done
          ? { from: '#E9F8F0', to: '#C6EDD9', orientation: 'TL_BR' }
          : { from: '#FFF7E6', to: '#FFDDB8', orientation: 'TL_BR' },
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 14,
      }}
    >
      <FlexWidget
        style={{
          height: 'match_parent',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingVertical: 8,
          flexGap: roomy ? 4 : 1,
        }}
      >
        <TextWidget
          text={prompt}
          maxLines={roomy ? 2 : 1}
          truncate="END"
          allowFontScaling={false}
          style={{ fontSize: roomy ? 14 : 12, fontWeight: 'bold', color: '#1F2A44' }}
        />
        <TextWidget
          text={done ? `✓ ${streak > 0 ? `🔥 ${streak}` : ''}`.trim() : `🔥 ${streak}`}
          maxLines={1}
          allowFontScaling={false}
          style={{ fontSize: number, fontWeight: 'bold', color: done ? '#059669' : '#EA580C' }}
        />
        {roomy && sub ? (
          <TextWidget
            text={sub}
            maxLines={1}
            truncate="END"
            allowFontScaling={false}
            style={{ fontSize: 11, fontWeight: 'bold', color: done ? '#059669' : '#6B7280' }}
          />
        ) : null}
      </FlexWidget>
      <ImageWidget image={done ? MIVO_HAPPY : MIVO_WAIT} imageWidth={mivo} imageHeight={mivo} />
    </FlexWidget>
  );
}
