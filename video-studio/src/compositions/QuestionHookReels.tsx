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
import { VoiceOrb } from '../components/VoiceOrb';

export const QuestionHookReels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Step 1: "İngilizce anlıyorsun..." (0 - 70)
  // Step 2: "Ama konuşurken neden donup kalıyorsun?" (70 - 180)
  // Step 3: The science/solution reveal (180 - 330)
  // Step 4: Outro CTA (330 - 450)

  const line1Opacity = interpolate(frame, [0, 15, 60, 75], [0, 1, 1, 0]);
  const line2Opacity = interpolate(frame, [75, 90, 170, 185], [0, 1, 1, 0]);
  const line3Opacity = interpolate(frame, [185, 205, 320, 335], [0, 1, 1, 0]);

  const outroOpacity = interpolate(frame, [335, 355], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#07050f', overflow: 'hidden' }}>
      <Background />

      {/* Floating Center Voice Orb throughout */}
      <div
        style={{
          position: 'absolute',
          top: 360,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: interpolate(frame, [330, 350], [1, 0], { extrapolateRight: 'clamp' }),
        }}
      >
        <VoiceOrb scale={1.4} active={true} />
      </div>

      {/* Question 1: "İngilizce anlıyorsun..." */}
      {frame < 80 && (
        <AbsoluteFill
          style={{
            opacity: line1Opacity,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
            textAlign: 'center',
            paddingTop: 360,
          }}
        >
          <h2
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 68,
              fontWeight: 800,
              color: '#d4b8ff',
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
            }}
          >
            İngilizce dinlediğinde her şeyi anlıyorsun...
          </h2>
        </AbsoluteFill>
      )}

      {/* Question 2: "Peki konuşurken neden donup kalıyorsun?" */}
      {frame >= 75 && frame < 190 && (
        <AbsoluteFill
          style={{
            opacity: line2Opacity,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
            textAlign: 'center',
            paddingTop: 360,
          }}
        >
          <h1
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 74,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1.25,
            }}
          >
            Peki sıra konuşmaya gelince{' '}
            <span
              style={{
                color: '#ff4d4d',
                textDecoration: 'underline',
                textUnderlineOffset: 12,
              }}
            >
              neden donup kalıyorsun?
            </span>
          </h1>
        </AbsoluteFill>
      )}

      {/* Answer / Solution Reveal: (185 - 335) */}
      {frame >= 180 && frame < 340 && (
        <AbsoluteFill
          style={{
            opacity: line3Opacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
            textAlign: 'center',
            paddingTop: 360,
          }}
        >
          <div
            style={{
              padding: '12px 28px',
              borderRadius: 30,
              background: 'rgba(0, 240, 255, 0.15)',
              border: '1.5px solid rgba(0, 240, 255, 0.5)',
              color: '#00f0ff',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 700,
              fontSize: 22,
              marginBottom: 24,
            }}
          >
            Cevap: Kas Hafızası & Pratik Eksikliği
          </div>

          <h2
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 54,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.3,
            }}
          >
            Beynin kural değil, <span style={{ color: '#00f0ff' }}>canlı diyalog</span> arıyor.
          </h2>
          <p style={{ color: '#a5a0c8', fontSize: 28, marginTop: 16 }}>
            Yankı ile her gün 5 dakika konuş, korkunu geride bırak.
          </p>
        </AbsoluteFill>
      )}

      {/* Outro Screen (335 - 450) */}
      {frame >= 330 && (
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
              boxShadow: '0 0 65px rgba(140, 82, 255, 0.85)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              marginBottom: 36,
            }}
          >
            <img
              src={staticFile('brand/spekvia-icon.png')}
              alt="Spekvia"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <h1
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 84,
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 16px 0',
            }}
          >
            Spekvia
          </h1>

          <p
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 36,
              fontWeight: 700,
              color: '#d4b8ff',
              margin: '0 0 50px 0',
              textAlign: 'center',
            }}
          >
            Konuşurken Donup Kalmaya Son Ver.
          </p>

          <div
            style={{
              background: 'linear-gradient(90deg, #8c52ff 0%, #00f0ff 100%)',
              borderRadius: 60,
              padding: '26px 64px',
              color: '#ffffff',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 32,
              fontWeight: 800,
              boxShadow: '0 0 40px rgba(0, 240, 255, 0.5)',
            }}
          >
            Ücretsiz Başla ➔
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
