import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const CinematicNavyReels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Widescreen cinematic bars opening
  const letterboxHeight = interpolate(frame, [0, 45], [200, 0], {
    extrapolateRight: 'clamp',
  });

  const text1Opacity = interpolate(frame, [15, 35, 110, 130], [0, 1, 1, 0]);
  const text2Opacity = interpolate(frame, [130, 150, 240, 260], [0, 1, 1, 0]);
  const climaxOpacity = interpolate(frame, [260, 285], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const orbPulse = Math.sin(frame * 0.1) * 0.06 + 1;
  const orbRotation = frame * 0.5;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#030814',
        overflow: 'hidden',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Deep Ocean Navy Gradient & Atmospheric Amber Lighting */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, #0c1e3d 0%, #061124 50%, #02060e 100%)',
        }}
      />

      {/* Warm Amber Sunburst / Light Flare */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          left: '30%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.28) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Icy Cyan Rim Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          right: '10%',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Cinematic Dust / Light Rays effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, transparent 60%, rgba(245, 158, 11, 0.05) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* 3D Orb Floating Centerpiece */}
      <div
        style={{
          position: 'absolute',
          top: 360,
          left: '50%',
          transform: `translateX(-50%) scale(${orbPulse})`,
          width: 260,
          height: 260,
          borderRadius: '50%',
          boxShadow: '0 0 80px rgba(56, 189, 248, 0.6), 0 0 120px rgba(245, 158, 11, 0.3)',
          border: '3px solid rgba(255, 255, 255, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={staticFile('11_ai_voice_orb.jpg')}
          alt="Orb"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `rotate(${orbRotation}deg)`,
          }}
        />
      </div>

      {/* Cinematic Text 1: "Sessizlik Bir Tercih Değil." */}
      {frame < 135 && (
        <AbsoluteFill
          style={{
            opacity: text1Opacity,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
            textAlign: 'center',
            paddingTop: 440,
            color: '#c61717'
          }}
          from={17}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#f59e0b',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            BİR KIRILMA ANI
          </span>
          <h1
            style={{
              fontSize: 74,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              textShadow: '0 10px 40px rgba(0,0,0,0.9)',
            }}
          >
            Sessizlik Bir Tercih Değil.
          </h1>
        </AbsoluteFill>
      )}

      {/* Cinematic Text 2: "Korkuyu Geride Bırak." */}
      {frame >= 125 && frame < 265 && (
        <AbsoluteFill
          style={{
            opacity: text2Opacity,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
            textAlign: 'center',
            paddingTop: 440,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#38bdf8',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            YENİ DÖNEM BAŞLIYOR
          </span>
          <h1
            style={{
              fontSize: 76,
              fontWeight: 900,
              background: 'linear-gradient(90deg, #ffffff 0%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              textShadow: '0 10px 40px rgba(0,0,0,0.9)',
            }}
          >
            Korkuyu Geride Bırak.
          </h1>
        </AbsoluteFill>
      )}

      {/* Climax / Brand Reveal (260 - 450 frames) */}
      {frame >= 255 && (
        <AbsoluteFill
          style={{
            opacity: climaxOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
            textAlign: 'center',
          }}
        >
          {/* Logo with Gold Rim Glow */}
          <div
            style={{
              width: 210,
              height: 210,
              borderRadius: 54,
              overflow: 'hidden',
              boxShadow: '0 0 70px rgba(245, 158, 11, 0.7), 0 30px 60px rgba(0, 0, 0, 0.9)',
              border: '4px solid rgba(245, 158, 11, 0.5)',
              marginBottom: 36,
            }}
          >
            <img
              src={staticFile('brand/spekvia-icon.png')}
              alt="Spekvia"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <h2
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              margin: '0 0 16px 0',
              textShadow: '0 0 50px rgba(56, 189, 248, 0.6)',
            }}
          >
            Spekvia
          </h2>

          <p
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#f59e0b',
              margin: '0 0 40px 0',
              letterSpacing: '0.04em',
            }}
          >
            Speak English Fearlessly.
          </p>

          <p
            style={{
              fontSize: 26,
              color: '#94a3b8',
              margin: '0 0 50px 0',
              maxWidth: 720,
              lineHeight: 1.4,
            }}
          >
            Gerçek hayat sahnelerinde yapay zeka ile konuş, akıcılığını zirveye taşı.
          </p>

          <div
            style={{
              background: 'linear-gradient(90deg, #f59e0b 0%, #38bdf8 100%)',
              borderRadius: 60,
              padding: '26px 68px',
              color: '#030814',
              fontSize: 34,
              fontWeight: 900,
              boxShadow: '0 0 50px rgba(245, 158, 11, 0.5)',
            }}
          >
            Sahneye Çık ➔
          </div>
        </AbsoluteFill>
      )}

      {/* Cinematic Top & Bottom Anamorphic Bars */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: letterboxHeight,
          backgroundColor: '#000000',
          zIndex: 100,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: letterboxHeight,
          backgroundColor: '#000000',
          zIndex: 100,
        }}
      />
    </AbsoluteFill>
  );
};
