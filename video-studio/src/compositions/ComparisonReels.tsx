import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Background } from '../components/Background';

export const ComparisonReels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Balance scale tilt physics
  const tiltAngle = interpolate(frame, [40, 120], [0, -14], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const outroOpacity = interpolate(frame, [360, 385], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0814', overflow: 'hidden' }}>
      <Background />

      {/* Top Hook Title */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 0,
          right: 0,
          textAlign: 'center',
          padding: '0 40px',
          opacity: interpolate(frame, [350, 370], [1, 0], { extrapolateRight: 'clamp' }),
        }}
      >
        <span
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: 22,
            fontWeight: 700,
            color: '#00f0ff',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Hangisi Daha Hızlı Sonuç Verir?
        </span>
        <h1
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: 66,
            fontWeight: 900,
            color: '#ffffff',
            margin: '12px 0 0 0',
            letterSpacing: '-0.02em',
          }}
        >
          Eski Yöntem vs. Spekiva
        </h1>
      </div>

      {/* Comparison Area with Tilt / Balance Metaphor */}
      <div
        style={{
          position: 'absolute',
          top: 360,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 36,
          padding: '0 60px',
          opacity: interpolate(frame, [350, 370], [1, 0], { extrapolateRight: 'clamp' }),
        }}
      >
        {/* OLD WAY CARD (Sinks / Fails) */}
        <div
          style={{
            transform: `scale(${cardSpring}) translateY(${interpolate(
              frame,
              [40, 120],
              [0, 20],
              { extrapolateRight: 'clamp' }
            )}px)`,
            width: '100%',
            maxWidth: 960,
            backgroundColor: 'rgba(38, 16, 24, 0.75)',
            backdropFilter: 'blur(20px)',
            borderRadius: 36,
            padding: '36px 40px',
            border: '2px solid rgba(255, 77, 77, 0.4)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 77, 77, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>❌</span>
            <h3
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 34,
                fontWeight: 800,
                color: '#ff6666',
                margin: 0,
              }}
            >
              Geleneksel Ezber Yolu
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ color: '#e8c4c4', fontSize: 24, fontWeight: 500 }}>
              • Yıllarca gramer kuralları ve test çözme
            </div>
            <div style={{ color: '#e8c4c4', fontSize: 24, fontWeight: 500 }}>
              • Konuşma anında akla hiçbir kelimenin gelmemesi
            </div>
            <div style={{ color: '#e8c4c4', fontSize: 24, fontWeight: 500 }}>
              • Hata yapma korkusu ve donup kalma (Silent Freeze)
            </div>
          </div>
        </div>

        {/* VERSUS ICON */}
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            backgroundColor: '#17142b',
            border: '2px solid #8c52ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 24,
            fontWeight: 900,
            boxShadow: '0 0 25px rgba(140, 82, 255, 0.8)',
          }}
        >
          VS
        </div>

        {/* SPEKIVA WAY (Rises & Shines) */}
        <div
          style={{
            transform: `scale(${cardSpring}) translateY(${interpolate(
              frame,
              [40, 120],
              [0, -20],
              { extrapolateRight: 'clamp' }
            )}px)`,
            width: '100%',
            maxWidth: 960,
            backgroundColor: 'rgba(22, 38, 34, 0.85)',
            backdropFilter: 'blur(20px)',
            borderRadius: 36,
            padding: '36px 40px',
            border: '2.5px solid rgba(0, 240, 255, 0.7)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 240, 255, 0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>✨</span>
            <h3
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 34,
                fontWeight: 800,
                color: '#00f0ff',
                margin: 0,
              }}
            >
              Spekiva ile Yapay Zeka Koçluğu
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ color: '#c4f0e8', fontSize: 24, fontWeight: 600 }}>
              ✓ Kafede, mülakatta, seyahatte gerçek senaryolar
            </div>
            <div style={{ color: '#c4f0e8', fontSize: 24, fontWeight: 600 }}>
              ✓ Anlık sesli geri bildirim ve akıcılık skoru (%96)
            </div>
            <div style={{ color: '#c4f0e8', fontSize: 24, fontWeight: 600 }}>
              ✓ Yargılanma korkusu olmadan sınırsız konuşma pratiği
            </div>
          </div>
        </div>
      </div>

      {/* Outro Transition (Frame 360 - 480) */}
      {frame >= 355 && (
        <AbsoluteFill
          style={{
            opacity: outroOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: 50,
              overflow: 'hidden',
              boxShadow: '0 0 60px rgba(0, 240, 255, 0.8)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
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
              fontFamily: 'system-ui, sans-serif',
              fontSize: 76,
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 16px 0',
              textAlign: 'center',
            }}
          >
            Karar Senin.
          </h2>

          <p
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 34,
              fontWeight: 700,
              color: '#00f0ff',
              margin: '0 0 50px 0',
              textAlign: 'center',
            }}
          >
            Ezberleme, Spekiva ile Akıcı Konuş.
          </p>

          <div
            style={{
              background: 'linear-gradient(90deg, #00f0ff 0%, #8c52ff 100%)',
              borderRadius: 60,
              padding: '26px 64px',
              color: '#ffffff',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 32,
              fontWeight: 800,
              boxShadow: '0 0 40px rgba(140, 82, 255, 0.6)',
            }}
          >
            Hemen Ücretsiz Dene ➔
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
