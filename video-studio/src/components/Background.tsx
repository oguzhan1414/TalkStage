import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // Floating ambient glow coordinates
  const orb1Y = interpolate(Math.sin(frame * 0.03), [-1, 1], [-50, 150]);
  const orb1X = interpolate(Math.cos(frame * 0.02), [-1, 1], [-80, 80]);

  const orb2Y = interpolate(Math.sin(frame * 0.025 + 2), [-1, 1], [600, 900]);
  const orb2X = interpolate(Math.cos(frame * 0.035), [-1, 1], [200, -100]);

  const orb3Y = interpolate(Math.cos(frame * 0.02 + 1), [-1, 1], [1300, 1600]);

  return (
    <div
      style={{
        position: 'absolute',
        width: 1080,
        height: 1920,
        backgroundColor: '#0a0814',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Deep gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 10%, #1e1338 0%, #0a0814 80%)',
        }}
      />

      {/* Floating Purple Orb */}
      <div
        style={{
          position: 'absolute',
          top: orb1Y,
          left: `calc(30% + ${orb1X}px)`,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(140, 82, 255, 0.45) 0%, rgba(140, 82, 255, 0) 70%)',
          filter: 'blur(80px)',
          opacity: 0.8,
        }}
      />

      {/* Floating Cyan/Teal Orb */}
      <div
        style={{
          position: 'absolute',
          top: orb2Y,
          left: `calc(50% + ${orb2X}px)`,
          width: 650,
          height: 650,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.35) 0%, rgba(0, 212, 255, 0) 70%)',
          filter: 'blur(90px)',
          opacity: 0.7,
        }}
      />

      {/* Deep Violet Base Orb */}
      <div
        style={{
          position: 'absolute',
          top: orb3Y,
          left: '20%',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(106, 38, 204, 0.4) 0%, rgba(106, 38, 204, 0) 70%)',
          filter: 'blur(100px)',
          opacity: 0.8,
        }}
      />

      {/* Subtle modern tech grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.6,
        }}
      />
    </div>
  );
};
