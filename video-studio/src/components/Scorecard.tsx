import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';

interface ScorecardProps {
  score?: number;
  label?: string;
  delay?: number;
}

export const Scorecard: React.FC<ScorecardProps> = ({
  score = 96,
  label = 'Speaking Fluency',
  delay = 0,
}) => {
  const frame = useCurrentFrame();

  const adjustedFrame = Math.max(0, frame - delay);
  const currentScore = Math.floor(
    interpolate(adjustedFrame, [0, 40], [20, score], { extrapolateRight: 'clamp' })
  );

  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(adjustedFrame, [0, 20], [0.8, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: 'rgba(28, 22, 54, 0.75)',
        backdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(140, 82, 255, 0.4)',
        borderRadius: 28,
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 212, 255, 0.3)',
      }}
    >
      {/* 7-Day Flame Badge */}
      <img
        src={staticFile('17_badge_7day_flame.png')}
        alt="Streak Badge"
        style={{
          width: 70,
          height: 70,
          filter: 'drop-shadow(0 0 15px rgba(255, 140, 0, 0.8))',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 22,
            color: '#a5a0c8',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {label}
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 54,
              fontWeight: 800,
              background: 'linear-gradient(90deg, #00f0ff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            %{currentScore}
          </span>
          <span
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 22,
              color: '#00f0ff',
              fontWeight: 700,
            }}
          >
            • EXCELLENT!
          </span>
        </div>
      </div>
    </div>
  );
};
