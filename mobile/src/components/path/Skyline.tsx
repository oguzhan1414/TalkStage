import { LinearGradient } from 'expo-linear-gradient';
import { memo, useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

import { HOME_BACKDROPS } from '../../assets/homeBackdrops';

/**
 * The path home's backdrop: a sky that changes with the level (A1 morning … C2 dusk), a few clouds, a far skyline and
 * a row of Bristol's colourful terraced houses standing on the horizon, then a soft cream ground for the text below.
 * Drawn in code; the shapes are seeded so they never jump between renders. When a level has its own painted backdrop
 * (assets/homeBackdrops.ts, prompts in docs/ana_sayfa_arka_planlari.md), that picture replaces the drawn sky and city,
 * its bottom edge standing on the horizon.
 */

type Palette = {
  sky: [string, string, string];
  sun: string;
  far: string;
  houses: string[];
  window: string;
  /** Lit windows and a moon instead of the sun (late levels). */
  evening?: boolean;
};

const PALETTES: Record<string, Palette> = {
  A1: {
    sky: ['#6FA9F5', '#A9CDFB', '#FDE9CF'],
    sun: '#FFE7A3',
    far: '#BFD3F2',
    houses: ['#F9A8D4', '#FDE68A', '#93C5FD', '#A7F3D0', '#FDBA74', '#C4B5FD'],
    window: '#E0F2FE',
  },
  A2: {
    sky: ['#5B9BF2', '#9CC6FA', '#E8F2FF'],
    sun: '#FFF1B8',
    far: '#B5CCF0',
    houses: ['#FCA5A5', '#FDE68A', '#7DD3FC', '#86EFAC', '#FDBA74', '#D8B4FE'],
    window: '#E0F2FE',
  },
  B1: {
    sky: ['#4C8DEF', '#8EBBF8', '#E3EEFF'],
    sun: '#FFF6CC',
    far: '#AFC6EE',
    houses: ['#F9A8D4', '#FCD34D', '#93C5FD', '#6EE7B7', '#FB923C', '#A5B4FC'],
    window: '#DBEAFE',
  },
  B2: {
    sky: ['#5E92E8', '#B7C9F4', '#FBE3B8'],
    sun: '#FFD98A',
    far: '#BCC5E8',
    houses: ['#F472B6', '#FBBF24', '#60A5FA', '#34D399', '#FB923C', '#A78BFA'],
    window: '#FEF3C7',
  },
  C1: {
    sky: ['#6D74DB', '#E6A5C0', '#FCD9A8'],
    sun: '#FFC27A',
    far: '#C7B8DE',
    houses: ['#EC4899', '#F59E0B', '#3B82F6', '#10B981', '#F97316', '#8B5CF6'],
    window: '#FDE68A',
    evening: true,
  },
  C2: {
    sky: ['#3F4596', '#9B7BC9', '#F2B49B'],
    sun: '#FDF2C4',
    far: '#8E86C2',
    houses: ['#DB2777', '#D97706', '#2563EB', '#059669', '#EA580C', '#7C3AED'],
    window: '#FDE047',
    evening: true,
  },
};

/** Small deterministic random numbers, so the city looks the same on every render. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let x = Math.imul(a ^ (a >>> 15), 1 | a);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

type House = { x: number; w: number; h: number; color: string; roof: 'gable' | 'flat'; chimney: boolean };

function buildCity(width: number, band: number, colors: string[]) {
  const rand = seeded(7);
  // Far skyline: plain shapes with gables, towers and a church spire.
  let far = '';
  for (let x = -10; x < width + 10;) {
    const w = 22 + rand() * 34;
    const h = band * (0.38 + rand() * 0.42);
    const top = band - h;
    if (rand() < 0.18) {
      // a spire
      far += `M${x} ${band} L${x} ${top + 14} L${x + w / 2} ${top - 18} L${x + w} ${top + 14} L${x + w} ${band} Z `;
    } else if (rand() < 0.5) {
      far += `M${x} ${band} L${x} ${top + 8} L${x + w / 2} ${top - 4} L${x + w} ${top + 8} L${x + w} ${band} Z `;
    } else {
      far += `M${x} ${band} L${x} ${top} L${x + w} ${top} L${x + w} ${band} Z `;
    }
    x += w - 2;
  }
  // Near row: colourful terraced houses.
  const houses: House[] = [];
  let i = 0;
  for (let x = -6; x < width + 6; i++) {
    const w = 38 + rand() * 16;
    const h = band * (0.42 + rand() * 0.2);
    houses.push({ x, w, h, color: colors[i % colors.length], roof: rand() < 0.65 ? 'gable' : 'flat', chimney: rand() < 0.45 });
    x += w;
  }
  return { far, houses };
}

function SkylineInner({ width, height, horizon, levelId }: { width: number; height: number; horizon: number; levelId: string }) {
  const p = PALETTES[levelId] ?? PALETTES.A1;
  const band = Math.min(150, Math.max(110, height * 0.17));
  const city = useMemo(() => buildCity(width, band, p.houses), [width, band, p.houses]);
  const top = horizon - band;

  const backdrop = HOME_BACKDROPS[levelId];
  if (backdrop) {
    const src = Image.resolveAssetSource(backdrop);
    const picH = src?.width ? (width * src.height) / src.width : horizon;
    return (
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <LinearGradient colors={p.sky} locations={[0, 0.55, 1]} style={[StyleSheet.absoluteFill, { bottom: height - horizon }]} />
        <Image source={backdrop} style={{ position: 'absolute', left: 0, width, height: picH, top: horizon - picH }} resizeMode="cover" />
        <Ground horizon={horizon} band={band} />
      </View>
    );
  }

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LinearGradient colors={p.sky} locations={[0, 0.55, 1]} style={[StyleSheet.absoluteFill, { bottom: height - horizon }]} />
      <Svg width={width} height={horizon} style={StyleSheet.absoluteFill}>
        {/* sun or moon */}
        <Circle cx={width * 0.82} cy={top - band * 0.35} r={band * 0.5} fill={p.sun} opacity={0.35} />
        <Circle cx={width * 0.82} cy={top - band * 0.35} r={band * 0.3} fill={p.sun} />
        {p.evening ? (
          <G opacity={0.8}>
            {[0.12, 0.3, 0.48, 0.63, 0.92].map((x, k) => (
              <Circle key={k} cx={width * x} cy={top * (0.18 + (k % 3) * 0.12)} r={1.6} fill="#FFFFFF" />
            ))}
          </G>
        ) : null}
        {/* clouds */}
        <G opacity={p.evening ? 0.35 : 0.75}>
          {[
            [0.16, 0.42, 1],
            [0.62, 0.3, 0.8],
            [0.9, 0.55, 0.7],
          ].map(([x, y, s], k) => (
            <G key={k}>
              <Ellipse cx={width * x} cy={top * y} rx={46 * s} ry={14 * s} fill="#FFFFFF" />
              <Ellipse cx={width * x - 14 * s} cy={top * y - 9 * s} rx={22 * s} ry={14 * s} fill="#FFFFFF" />
              <Ellipse cx={width * x + 12 * s} cy={top * y - 11 * s} rx={18 * s} ry={13 * s} fill="#FFFFFF" />
            </G>
          ))}
        </G>
        {/* far skyline */}
        <G y={top}>
          <Path d={city.far} fill={p.far} opacity={0.75} />
        </G>
        {/* terraced houses */}
        <G y={top}>
          {city.houses.map((h, k) => {
            const y = band - h.h;
            const winW = Math.max(6, h.w * 0.18);
            return (
              <G key={k}>
                {h.chimney ? <Rect x={h.x + h.w * 0.68} y={y - 16} width={7} height={16} fill={h.color} opacity={0.9} /> : null}
                {h.roof === 'gable' ? (
                  <Path d={`M${h.x - 1} ${y + 2} L${h.x + h.w / 2} ${y - 12} L${h.x + h.w + 1} ${y + 2} Z`} fill={h.color} opacity={0.85} />
                ) : (
                  <Rect x={h.x - 1} y={y - 4} width={h.w + 2} height={5} fill={h.color} opacity={0.85} />
                )}
                <Rect x={h.x} y={y} width={h.w} height={h.h} fill={h.color} />
                <Rect
                  x={h.x + h.w * 0.18}
                  y={y + h.h * 0.18}
                  width={winW}
                  height={winW * 1.3}
                  rx={1.5}
                  fill={p.window}
                  opacity={p.evening ? 0.95 : 0.8}
                />
                <Rect
                  x={h.x + h.w * 0.64}
                  y={y + h.h * 0.18}
                  width={winW}
                  height={winW * 1.3}
                  rx={1.5}
                  fill={p.window}
                  opacity={p.evening ? 0.95 : 0.8}
                />
                <Rect x={h.x + h.w * 0.4} y={band - h.h * 0.32} width={h.w * 0.2} height={h.h * 0.32} rx={2} fill="#FFFFFF" opacity={0.55} />
              </G>
            );
          })}
        </G>
      </Svg>
      <Ground horizon={horizon} band={band} />
    </View>
  );
}

/** The cream floor under the horizon, with the city's feet melting into it. */
function Ground({ horizon, band }: { horizon: number; band: number }) {
  return (
    <>
      <LinearGradient colors={['#FFF7EC', '#F8FAFC']} style={[StyleSheet.absoluteFill, { top: horizon - 1 }]} />
      <LinearGradient
        colors={['rgba(255,247,236,0)', 'rgba(255,247,236,0.85)']}
        style={{ position: 'absolute', left: 0, right: 0, top: horizon - band * 0.35, height: band * 0.36 }}
      />
    </>
  );
}

export const Skyline = memo(SkylineInner);
