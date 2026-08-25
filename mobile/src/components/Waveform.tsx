import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radii } from '../theme/tokens';

const BAR_COUNT = 24;
const MIN_DB = -60; // quieter than this reads as silence for display purposes
const MAX_DB = 0;

function normalize(db: number) {
  const clamped = Math.max(MIN_DB, Math.min(MAX_DB, db));
  return (clamped - MIN_DB) / (MAX_DB - MIN_DB);
}

type Props = {
  /** dBFS from `useVoiceRecorder().meteringDb`. */
  meteringDb: number;
  active: boolean;
};

/** Live bar-style waveform driven by mic metering level. Resets to a flat baseline when `active` is false. */
export function Waveform({ meteringDb, active }: Props) {
  const [levels, setLevels] = useState<number[]>(() => Array(BAR_COUNT).fill(0.05));

  useEffect(() => {
    if (!active) {
      setLevels(Array(BAR_COUNT).fill(0.05));
      return;
    }
    setLevels((prev) => [...prev.slice(1), Math.max(0.05, normalize(meteringDb))]);
  }, [meteringDb, active]);

  return (
    <View style={styles.row}>
      {levels.map((level, i) => (
        <View key={i} style={[styles.bar, { height: 6 + level * 48 }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 3,
    height: 56,
  },
  bar: {
    width: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.brand,
  },
});
