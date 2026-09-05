import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Polygon, Text as SvgText } from 'react-native-svg';

import { colors, fonts, radii } from '../theme/tokens';

export type RadarMetrics = {
  fluency: number; // 0 - 100
  pronunciation: number; // 0 - 100
  grammar: number; // 0 - 100
  vocabulary: number; // 0 - 100
  speed: number; // 0 - 100 (derived from WPM benchmark)
};

interface SkillsRadarChartProps {
  metrics: RadarMetrics;
  size?: number;
  showLabels?: boolean;
}

const AXIS_CONFIG = [
  { key: 'fluency' as const, label: 'Akıcılık', emoji: '⚡', angle: -90 },
  { key: 'pronunciation' as const, label: 'Telaffuz', emoji: '🎯', angle: -18 },
  { key: 'grammar' as const, label: 'Gramer', emoji: '📐', angle: 54 },
  { key: 'vocabulary' as const, label: 'Kelime', emoji: '📚', angle: 126 },
  { key: 'speed' as const, label: 'WPM Hızı', emoji: '🚀', angle: 198 },
];

export function SkillsRadarChart({
  metrics,
  size = 280,
  showLabels = true,
}: SkillsRadarChartProps) {
  const center = size / 2;
  const maxRadius = (size / 2) * 0.65;
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (angleDeg: number, radius: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(angleRad),
      y: center + radius * Math.sin(angleRad),
    };
  };

  // Generate background grid polygon points
  const gridPolygons = levels.map((lvl) => {
    const points = AXIS_CONFIG.map((axis) => {
      const { x, y } = getCoordinates(axis.angle, maxRadius * lvl);
      return `${x},${y}`;
    }).join(' ');
    return points;
  });

  // Generate data polygon points
  const dataPoints = AXIS_CONFIG.map((axis) => {
    const rawVal = Math.min(100, Math.max(10, metrics[axis.key] ?? 70));
    const radius = maxRadius * (rawVal / 100);
    const { x, y } = getCoordinates(axis.angle, radius);
    return { x, y, val: rawVal };
  });

  const polygonPointsStr = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Calculate overall average score
  const avgScore = Math.round(
    (metrics.fluency + metrics.pronunciation + metrics.grammar + metrics.vocabulary + metrics.speed) / 5
  );

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Background Concentric Polygon Web */}
        {gridPolygons.map((points, idx) => (
          <Polygon
            key={`grid_${idx}`}
            points={points}
            fill={idx === levels.length - 1 ? '#F8FAFC' : 'none'}
            stroke="#E2E8F0"
            strokeWidth={idx === levels.length - 1 ? 1.5 : 1}
            strokeDasharray={idx === levels.length - 1 ? undefined : '3,3'}
          />
        ))}

        {/* Axis Lines from center */}
        {AXIS_CONFIG.map((axis, idx) => {
          const { x, y } = getCoordinates(axis.angle, maxRadius);
          return (
            <Line
              key={`axis_${idx}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#CBD5E1"
              strokeWidth={1}
            />
          );
        })}

        {/* User Skills Radar Area */}
        <Polygon
          points={polygonPointsStr}
          fill="rgba(79, 70, 229, 0.22)"
          stroke="#4F46E5"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />

        {/* Vertex Points */}
        {dataPoints.map((p, idx) => (
          <Circle
            key={`point_${idx}`}
            cx={p.x}
            cy={p.y}
            r={4.5}
            fill="#FFFFFF"
            stroke="#4F46E5"
            strokeWidth={2}
          />
        ))}

        {/* Labels at outer rim */}
        {showLabels &&
          AXIS_CONFIG.map((axis, idx) => {
            const labelRadius = maxRadius + 22;
            const { x, y } = getCoordinates(axis.angle, labelRadius);
            const score = metrics[axis.key] ?? 0;

            return (
              <SvgText
                key={`label_${idx}`}
                x={x}
                y={y + 3}
                fontSize={9}
                fontWeight="700"
                fontFamily={fonts.mono}
                fill={colors.textHeading}
                textAnchor="middle"
              >
                {`${axis.emoji} %${score}`}
              </SvgText>
            );
          })}
      </Svg>

      {/* Center Overall Score Badge */}
      <View style={[styles.centerScoreBadge, { top: center - 16, left: center - 16 }]}>
        <Text style={styles.centerScoreText}>%{avgScore}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    alignSelf: 'center',
  },
  centerScoreBadge: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  centerScoreText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
  },
});
