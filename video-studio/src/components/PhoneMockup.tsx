import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';

interface PhoneMockupProps {
  imageSrc?: string;
  tiltAngle?: number;
  scale?: number;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  imageSrc = 'home.png',
  tiltAngle = 0,
  scale = 1,
}) => {
  const frame = useCurrentFrame();

  // Floating gentle levitation
  const floatY = Math.sin(frame * 0.05) * 12;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 1200,
        transform: `translateY(${floatY}px) scale(${scale})`,
      }}
    >
      {/* 3D Phone Chassis */}
      <div
        style={{
          width: 440,
          height: 900,
          backgroundColor: '#12101e',
          borderRadius: 56,
          padding: 12,
          boxShadow:
            '0 35px 80px -15px rgba(0, 0, 0, 0.8), 0 0 45px rgba(140, 82, 255, 0.4), inset 0 0 4px 2px rgba(255, 255, 255, 0.2)',
          border: '4px solid #282142',
          transform: `rotateY(${tiltAngle}deg) rotateZ(${-tiltAngle * 0.25}deg)`,
          position: 'relative',
        }}
      >
        {/* Dynamic Island / Notch */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 28,
            backgroundColor: '#000',
            borderRadius: 20,
            zIndex: 10,
          }}
        />

        {/* Screen Display */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 44,
            overflow: 'hidden',
            backgroundColor: '#0a0914',
            position: 'relative',
          }}
        >
          <img
            src={staticFile(imageSrc)}
            alt="Spekvia App Screen"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Screen Gloss Reflection */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.0) 40%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
};
