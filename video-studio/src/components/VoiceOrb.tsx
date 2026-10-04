import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';

interface VoiceOrbProps {
  scale?: number;
  active?: boolean;
}

export const VoiceOrb: React.FC<VoiceOrbProps> = ({ scale = 1, active = true }) => {
  const frame = useCurrentFrame();

  const pulse = Math.sin(frame * 0.12) * 0.08 + 1;
  const rotation = frame * 0.8;

  // Expanding sound waves
  const wave1 = (frame * 3) % 100;
  const wave1Opacity = interpolate(wave1, [0, 50, 100], [0.8, 0.4, 0]);
  const wave1Scale = interpolate(wave1, [0, 100], [1, 2.2]);

  const wave2 = ((frame + 18) * 3) % 100;
  const wave2Opacity = interpolate(wave2, [0, 50, 100], [0.8, 0.4, 0]);
  const wave2Scale = interpolate(wave2, [0, 100], [1, 2.4]);

  return (
    <div
      style={{
        position: 'relative',
        width: 180,
        height: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${scale * pulse})`,
      }}
    >
      {/* Sound wave ring 1 */}
      {active && (
        <div
          style={{
            position: 'absolute',
            width: 180,
            height: 180,
            borderRadius: '50%',
            border: '2px solid rgba(0, 212, 255, 0.8)',
            transform: `scale(${wave1Scale})`,
            opacity: wave1Opacity,
          }}
        />
      )}

      {/* Sound wave ring 2 */}
      {active && (
        <div
          style={{
            position: 'absolute',
            width: 180,
            height: 180,
            borderRadius: '50%',
            border: '2px solid rgba(140, 82, 255, 0.8)',
            transform: `scale(${wave2Scale})`,
            opacity: wave2Opacity,
          }}
        />
      )}

      {/* Glowing Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: -15,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(140, 82, 255, 0.8) 0%, rgba(0, 212, 255, 0.3) 60%, transparent 80%)',
          filter: 'blur(16px)',
        }}
      />

      {/* Central Orb Image */}
      <div
        style={{
          position: 'relative',
          width: 160,
          height: 160,
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 0 35px rgba(140, 82, 255, 0.9), inset 0 0 20px rgba(0, 212, 255, 0.8)',
          border: '3px solid rgba(255, 255, 255, 0.35)',
        }}
      >
        <img
          src={staticFile('11_ai_voice_orb.jpg')}
          alt="AI Voice Orb"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `rotate(${rotation}deg)`,
          }}
        />
      </div>
    </div>
  );
};
