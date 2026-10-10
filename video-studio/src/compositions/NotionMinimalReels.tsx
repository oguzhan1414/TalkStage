import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const NotionMinimalReels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Highlighter width expansion animation
  const highlightWidth = interpolate(frame, [45, 95], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const line2Opacity = interpolate(frame, [110, 130], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const phoneFrame = Math.max(0, frame - 160);
  const phoneSpring = spring({
    frame: phoneFrame,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  const outroOpacity = interpolate(frame, [350, 375], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#fafaf9',
        overflow: 'hidden',
        color: '#0f172a',
        fontFamily: 'system-ui, -apple-system, Inter, sans-serif',
      }}
    >
      {/* Subtle clean paper grain / border */}
      <div
        style={{
          position: 'absolute',
          inset: 24,
          border: '1px solid rgba(0, 0, 0, 0.06)',
          borderRadius: 40,
          pointerEvents: 'none',
        }}
      />

      {/* Main Content Area */}
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '140px 60px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
          opacity: interpolate(frame, [345, 365], [1, 0], { extrapolateRight: 'clamp' }),
        }}
      >
        {/* Top Minimalist Tag */}
        <div
          style={{
            backgroundColor: '#f1f5f9',
            border: '1px solid #e2e8f0',
            color: '#64748b',
            padding: '10px 24px',
            borderRadius: 24,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 48,
          }}
        >
          ✦ Spekiva Minimalist Note ✦
        </div>

        {/* Thought / Hook Typography */}
        <div style={{ textAlign: 'center', maxWidth: 860 }}>
          <p
            style={{
              fontSize: 48,
              fontWeight: 600,
              color: '#64748b',
              margin: '0 0 16px 0',
              lineHeight: 1.3,
            }}
          >
            İngilizce konuşmak için
          </p>

          {/* Highlighted text block */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Soft Yellow Highlighter Bar */}
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                left: 0,
                width: `${highlightWidth}%`,
                height: 38,
                backgroundColor: '#fef08a',
                zIndex: 0,
                borderRadius: 8,
                opacity: 0.9,
              }}
            />
            <h1
              style={{
                position: 'relative',
                zIndex: 1,
                fontSize: 68,
                fontWeight: 900,
                color: '#0f172a',
                margin: 0,
                lineHeight: 1.25,
                letterSpacing: '-0.03em',
              }}
            >
              yurt dışına taşınmana gerek yok.
            </h1>
          </div>

          {/* Solution Line */}
          <p
            style={{
              opacity: line2Opacity,
              fontSize: 38,
              fontWeight: 700,
              color: '#0f172a',
              marginTop: 40,
              lineHeight: 1.35,
            }}
          >
            İhtiyacın olan tek şey:{' '}
            <span style={{ color: '#2563eb' }}>seni yargılamayan bir partner.</span>
          </p>
        </div>

        {/* Minimalist Phone Reveal (Frame 160+) */}
        {frame >= 155 && (
          <div
            style={{
              transform: `translateY(${interpolate(phoneSpring, [0, 1], [400, 0])}px) scale(0.95)`,
              marginTop: 50,
              width: 400,
              height: 720,
              backgroundColor: '#ffffff',
              borderRadius: 48,
              padding: 10,
              border: '4px solid #e2e8f0',
              boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
            }}
          >
            <img
              src={staticFile('home.png')}
              alt="Spekiva"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 38 }}
            />
          </div>
        )}
      </div>

      {/* Outro Screen (Frame 350 - 420) */}
      {frame >= 345 && (
        <AbsoluteFill
          style={{
            opacity: outroOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
            backgroundColor: '#0f172a',
            color: '#ffffff',
          }}
        >
          <div
            style={{
              width: 190,
              height: 190,
              borderRadius: 48,
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
              border: '3px solid #334155',
              marginBottom: 36,
            }}
          >
            <img
              src={staticFile('brand/spekiva-icon.png')}
              alt="Spekiva"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <h2
            style={{
              fontSize: 82,
              fontWeight: 900,
              margin: '0 0 16px 0',
              textAlign: 'center',
              letterSpacing: '-0.02em',
            }}
          >
            Spekiva
          </h2>

          <p
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: '#94a3b8',
              margin: '0 0 46px 0',
              textAlign: 'center',
            }}
          >
            Günde 5 Dakika. Sıfır Yargılama.
          </p>

          <div
            style={{
              backgroundColor: '#ffffff',
              color: '#0f172a',
              borderRadius: 50,
              padding: '24px 64px',
              fontSize: 32,
              fontWeight: 800,
              boxShadow: '0 10px 30px rgba(255, 255, 255, 0.2)',
            }}
          >
            Konuşmaya Başla ➔
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
