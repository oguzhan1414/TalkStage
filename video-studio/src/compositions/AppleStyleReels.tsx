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
import { PhoneMockup } from '../components/PhoneMockup';

export const AppleStyleReels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Words flashing in sequence
  // 0 - 50: "Ezberleme."
  // 50 - 100: "Korkma."
  // 100 - 160: "Yalnızca Konuş."
  // 160 - 480: Phone Zoom & Landing reveal

  const word1Opacity = interpolate(frame, [0, 10, 40, 50], [0, 1, 1, 0]);
  const word2Opacity = interpolate(frame, [50, 60, 90, 100], [0, 1, 1, 0]);
  const word3Opacity = interpolate(frame, [100, 115, 150, 160], [0, 1, 1, 0]);

  const phoneRevealFrame = Math.max(0, frame - 160);
  const phoneScale = interpolate(
    spring({ frame: phoneRevealFrame, fps, config: { damping: 14, stiffness: 90 } }),
    [0, 1],
    [0.7, 1.15]
  );
  const phoneOpacity = interpolate(phoneRevealFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
      <Background />

      {/* Kinetic Typography Flashes (0 - 160 frames) */}
      {frame < 165 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 40px',
            textAlign: 'center',
          }}
        >
          {/* Word 1 */}
          {frame < 55 && (
            <h1
              style={{
                opacity: word1Opacity,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 110,
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.04em',
                transform: `scale(${interpolate(frame, [0, 50], [0.92, 1.05])})`,
              }}
            >
              Ezberleme.
            </h1>
          )}

          {/* Word 2 */}
          {frame >= 45 && frame < 105 && (
            <h1
              style={{
                opacity: word2Opacity,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 120,
                fontWeight: 900,
                color: '#ff4d4d',
                letterSpacing: '-0.04em',
                transform: `scale(${interpolate(frame, [50, 100], [0.92, 1.05])})`,
              }}
            >
              Korkma.
            </h1>
          )}

          {/* Word 3 */}
          {frame >= 95 && (
            <h1
              style={{
                opacity: word3Opacity,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 104,
                fontWeight: 900,
                background: 'linear-gradient(90deg, #00f0ff 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.04em',
                transform: `scale(${interpolate(frame, [100, 160], [0.92, 1.08])})`,
                filter: 'drop-shadow(0 0 40px rgba(0, 240, 255, 0.6))',
              }}
            >
              Yalnızca Konuş.
            </h1>
          )}
        </AbsoluteFill>
      )}

      {/* Phone Reveal & App UI (160 - 480 frames) */}
      {frame >= 155 && (
        <AbsoluteFill
          style={{
            opacity: phoneOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 110,
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <span
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 22,
                fontWeight: 700,
                color: '#d4b8ff',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              YENİ NESİL DİL DENEYİMİ
            </span>
            <h2
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: 72,
                fontWeight: 900,
                color: '#ffffff',
                margin: '10px 0 0 0',
                letterSpacing: '-0.02em',
              }}
            >
              Spekiva
            </h2>
          </div>

          {/* Centered Phone Showcase */}
          <div style={{ transform: `scale(${phoneScale})` }}>
            <PhoneMockup imageSrc="home.png" tiltAngle={0} scale={1.15} />
          </div>

          {/* Bottom Floating Pill CTA */}
          <div
            style={{
              position: 'absolute',
              bottom: 90,
              padding: '24px 56px',
              borderRadius: 50,
              background: 'linear-gradient(90deg, #8c52ff 0%, #00f0ff 100%)',
              boxShadow: '0 0 50px rgba(0, 240, 255, 0.6)',
              color: '#ffffff',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            Hemen Konuşmaya Başla ➔
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
