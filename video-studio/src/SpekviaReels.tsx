import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Background } from './components/Background';
import { PhoneMockup } from './components/PhoneMockup';
import { Scorecard } from './components/Scorecard';
import { VoiceOrb } from './components/VoiceOrb';

export const SpekviaReels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ----------------------------------------------------
  // SCENE 1: THE HOOK (0 - 110 frames / 0s - 1.83s)
  // ----------------------------------------------------
  const scene1Opacity = interpolate(frame, [95, 110], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const chatEnter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const typingProgress = Math.min(1, Math.max(0, frame / 50));
  const fullText = 'Why do I freeze when I speak English?';
  const displayedText = fullText.slice(0, Math.floor(typingProgress * fullText.length));

  // ----------------------------------------------------
  // SCENE 2: THE BREAKTHROUGH & APP REVEAL (110 - 230 frames)
  // ----------------------------------------------------
  const scene2Frame = Math.max(0, frame - 110);
  const scene2Opacity = interpolate(frame, [105, 115, 215, 230], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const headlineSpring = spring({
    frame: scene2Frame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const phoneEnter = spring({
    frame: Math.max(0, scene2Frame - 15),
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  // ----------------------------------------------------
  // SCENE 3: REAL SCENARIOS & LIVE SCORE (230 - 350 frames)
  // ----------------------------------------------------
  const scene3Frame = Math.max(0, frame - 230);
  const scene3Opacity = interpolate(frame, [225, 235, 335, 350], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scenarioCardSpring = spring({
    frame: scene3Frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  // ----------------------------------------------------
  // SCENE 4: OUTRO & BRAND CALL TO ACTION (350 - 480 frames)
  // ----------------------------------------------------
  const scene4Frame = Math.max(0, frame - 350);
  const scene4Opacity = interpolate(frame, [345, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const logoSpring = spring({
    frame: scene4Frame,
    fps,
    config: { damping: 12, stiffness: 110 },
  });

  const buttonPulse = Math.sin(frame * 0.15) * 0.04 + 1;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0814', overflow: 'hidden' }}>
      {/* Dynamic Animated Ambient Background */}
      <Background />

      {/* ============================================================== */}
      {/* SCENE 1: THE HOOK QUESTION */}
      {/* ============================================================== */}
      {frame < 115 && (
        <AbsoluteFill
          style={{
            opacity: scene1Opacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
          }}
        >
          {/* Top Pill Badge */}
          <div
            style={{
              padding: '12px 28px',
              borderRadius: 30,
              background: 'rgba(140, 82, 255, 0.2)',
              border: '1px solid rgba(140, 82, 255, 0.5)',
              color: '#d4b8ff',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 40,
            }}
          >
            ✦ The Speaking Dilemma ✦
          </div>

          {/* Interactive Chat Box */}
          <div
            style={{
              transform: `scale(${chatEnter})`,
              width: '100%',
              maxWidth: 960,
              borderRadius: 36,
              background: 'rgba(25, 20, 48, 0.85)',
              backdropFilter: 'blur(24px)',
              border: '2px solid rgba(140, 82, 255, 0.45)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(140, 82, 255, 0.3)',
              padding: '48px 52px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  backgroundColor: '#ff4d4d',
                  boxShadow: '0 0 12px #ff4d4d',
                }}
              />
              <span
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: 24,
                  fontWeight: 600,
                  color: '#9e9bbd',
                  letterSpacing: '0.04em',
                }}
              >
                Silent Freeze Problem
              </span>
            </div>

            <div
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 54,
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.25,
                minHeight: 140,
              }}
            >
              "{displayedText}"
              <span
                style={{
                  display: 'inline-block',
                  width: 4,
                  height: 48,
                  backgroundColor: '#00f0ff',
                  marginLeft: 8,
                  verticalAlign: 'middle',
                  opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
                }}
              />
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: 20,
                color: '#00d4ff',
                fontFamily: 'system-ui, sans-serif',
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              Kelime biliyorsun ama konuşurken donup kalıyor musun?
            </div>
          </div>

          {/* Pulsing AI Voice Orb below */}
          <div style={{ marginTop: 80 }}>
            <VoiceOrb scale={1.2} />
          </div>
        </AbsoluteFill>
      )}

      {/* ============================================================== */}
      {/* SCENE 2: STOP FREEZING & PHONE REVEAL */}
      {/* ============================================================== */}
      {frame >= 105 && frame < 235 && (
        <AbsoluteFill
          style={{
            opacity: scene2Opacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 120,
          }}
        >
          {/* Kinetic Headline */}
          <div
            style={{
              textAlign: 'center',
              transform: `scale(${headlineSpring})`,
              marginBottom: 40,
            }}
          >
            <h1
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 68,
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              STOP FREEZING.
            </h1>
            <h1
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 76,
                fontWeight: 900,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, #8c52ff 0%, #00f0ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '8px 0 0 0',
                textTransform: 'uppercase',
                filter: 'drop-shadow(0 0 35px rgba(0, 240, 255, 0.5))',
              }}
            >
              START TALKING.
            </h1>
          </div>

          {/* 3D Phone Mockup with Home Screen */}
          <div
            style={{
              transform: `translateY(${interpolate(phoneEnter, [0, 1], [300, 0])}px)`,
              opacity: phoneEnter,
            }}
          >
            <PhoneMockup imageSrc="home.png" tiltAngle={-6} scale={1.12} />
          </div>

          {/* Floating Pill Feature Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: 120,
              padding: '16px 36px',
              borderRadius: 40,
              background: 'rgba(18, 14, 38, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(0, 212, 255, 0.6)',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 212, 255, 0.4)',
              color: '#ffffff',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 26,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span style={{ color: '#00f0ff' }}>●</span> AI Canlı Konuşma Simülasyonu
          </div>
        </AbsoluteFill>
      )}

      {/* ============================================================== */}
      {/* SCENE 3: REAL-LIFE SCENARIOS & INSTANT FEEDBACK */}
      {/* ============================================================== */}
      {frame >= 225 && frame < 355 && (
        <AbsoluteFill
          style={{
            opacity: scene3Opacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 140,
            paddingLeft: 60,
            paddingRight: 60,
          }}
        >
          {/* Header */}
          <div
            style={{
              textAlign: 'center',
              transform: `scale(${scenarioCardSpring})`,
              marginBottom: 50,
            }}
          >
            <span
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 24,
                fontWeight: 700,
                color: '#d4b8ff',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Gerçek Hayat Sahnesi
            </span>
            <h2
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 62,
                fontWeight: 900,
                color: '#ffffff',
                margin: '12px 0 0 0',
              }}
            >
              Kafede, Mülakatta, Seyahatte.
            </h2>
          </div>

          {/* Scenario Spotlight Card */}
          <div
            style={{
              width: '100%',
              maxWidth: 960,
              borderRadius: 40,
              overflow: 'hidden',
              backgroundColor: '#1b1435',
              border: '2px solid rgba(140, 82, 255, 0.6)',
              boxShadow: '0 30px 70px rgba(0, 0, 0, 0.7), 0 0 40px rgba(140, 82, 255, 0.3)',
              position: 'relative',
              marginBottom: 40,
            }}
          >
            <img
              src={staticFile('coffe.jpeg')}
              alt="Cafe Meetup"
              style={{
                width: '100%',
                height: 480,
                objectFit: 'cover',
                opacity: 0.85,
              }}
            />

            {/* Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10, 8, 20, 0.95) 15%, transparent 60%)',
              }}
            />

            {/* Card Content */}
            <div
              style={{
                position: 'absolute',
                bottom: 30,
                left: 36,
                right: 36,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <div>
                <span
                  style={{
                    backgroundColor: '#8c52ff',
                    color: '#fff',
                    padding: '6px 16px',
                    borderRadius: 16,
                    fontSize: 18,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                  }}
                >
                  A1 Seviye
                </span>
                <h3
                  style={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: 38,
                    fontWeight: 800,
                    color: '#ffffff',
                    margin: '12px 0 4px 0',
                  }}
                >
                  Café Meetup: Yankı ile Kahve Siparişi
                </h3>
                <p style={{ color: '#a5a0c8', fontSize: 22, margin: 0 }}>
                  "I would like a cappuccino, please."
                </p>
              </div>

              {/* First Mic Badge */}
              <img
                src={staticFile('14_badge_first_mic.png')}
                alt="Mic Badge"
                style={{
                  width: 90,
                  height: 90,
                  filter: 'drop-shadow(0 0 18px rgba(0, 212, 255, 0.7))',
                }}
              />
            </div>
          </div>

          {/* Animated Live Scorecard Widget */}
          <div style={{ width: '100%', maxWidth: 960 }}>
            <Scorecard score={96} label="Anlık Akıcılık Skoru" delay={20} />
          </div>

          {/* Pulsing Orb at the bottom */}
          <div style={{ marginTop: 50 }}>
            <VoiceOrb scale={1.1} />
          </div>
        </AbsoluteFill>
      )}

      {/* ============================================================== */}
      {/* SCENE 4: FINAL CLIMAX & CALL TO ACTION */}
      {/* ============================================================== */}
      {frame >= 345 && (
        <AbsoluteFill
          style={{
            opacity: scene4Opacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
          }}
        >
          {/* Glowing App Icon */}
          <div
            style={{
              transform: `scale(${logoSpring})`,
              width: 220,
              height: 220,
              borderRadius: 54,
              overflow: 'hidden',
              boxShadow: '0 0 70px rgba(140, 82, 255, 0.8), 0 25px 50px rgba(0, 0, 0, 0.9)',
              border: '4px solid rgba(255, 255, 255, 0.4)',
              marginBottom: 40,
            }}
          >
            <img
              src={staticFile('brand/spekvia-icon.png')}
              alt="Spekvia Logo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Brand Name */}
          <h1
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 90,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(90deg, #ffffff 0%, #d4b8ff 50%, #00f0ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 16px 0',
            }}
          >
            Spekvia
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 38,
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 40px 0',
              textAlign: 'center',
              letterSpacing: '0.02em',
            }}
          >
            Speak English Fearlessly.
          </p>

          <p
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 26,
              color: '#a5a0c8',
              margin: '0 0 60px 0',
              textAlign: 'center',
              maxWidth: 720,
              lineHeight: 1.4,
            }}
          >
            Yapay zeka ile gerçek senaryolarda konuşma pratiği yap, duraksamadan akıcı konuşmaya başla.
          </p>

          {/* Big Glowing CTA Button */}
          <div
            style={{
              transform: `scale(${buttonPulse})`,
              background: 'linear-gradient(90deg, #8c52ff 0%, #00c6ff 100%)',
              borderRadius: 60,
              padding: '28px 68px',
              color: '#ffffff',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 34,
              fontWeight: 800,
              boxShadow: '0 0 45px rgba(0, 198, 255, 0.6), 0 20px 40px rgba(0, 0, 0, 0.7)',
              letterSpacing: '0.03em',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            Ücretsiz Başla ➔
          </div>

          {/* Store Availability Footnote */}
          <div
            style={{
              marginTop: 40,
              display: 'flex',
              gap: 30,
              color: '#7f7b9c',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            <span>📱 iOS App Store</span>
            <span>•</span>
            <span>🤖 Google Play Store</span>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
