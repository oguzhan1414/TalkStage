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

interface NotificationItemProps {
  delay: number;
  icon: string;
  appTitle: string;
  time: string;
  title: string;
  message: string;
  badgeColor?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  delay,
  icon,
  appTitle,
  time,
  title,
  message,
  badgeColor = '#8c52ff',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);
  const slideSpring = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const opacity = interpolate(adjustedFrame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  if (frame < delay) return null;

  return (
    <div
      style={{
        transform: `translateY(${interpolate(slideSpring, [0, 1], [60, 0])}px) scale(${interpolate(
          slideSpring,
          [0, 1],
          [0.92, 1]
        )})`,
        opacity,
        width: '100%',
        maxWidth: 960,
        backgroundColor: 'rgba(28, 24, 48, 0.78)',
        backdropFilter: 'blur(30px)',
        borderRadius: 36,
        padding: '28px 32px',
        border: '1.5px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(140, 82, 255, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        marginBottom: 24,
      }}
    >
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img
            src={staticFile(icon)}
            alt={appTitle}
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              boxShadow: `0 0 14px ${badgeColor}`,
            }}
          />
          <span
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 22,
              fontWeight: 700,
              color: '#d4b8ff',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {appTitle}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: 20,
            color: '#8e8aa8',
            fontWeight: 500,
          }}
        >
          {time}
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: 30,
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.25,
        }}
      >
        {title}
      </div>

      {/* Message */}
      <div
        style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: 24,
          fontWeight: 500,
          color: '#c2bddc',
          lineHeight: 1.35,
        }}
      >
        {message}
      </div>
    </div>
  );
};

export const NotificationsReels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Outro transition after frame 360
  const outroFrame = Math.max(0, frame - 360);
  const outroOpacity = interpolate(frame, [355, 375], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const outroSpring = spring({
    frame: outroFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0814', overflow: 'hidden' }}>
      <Background />

      {/* Lockscreen Header (Clock & Date) */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          width: '100%',
          textAlign: 'center',
          opacity: interpolate(frame, [350, 370], [1, 0], { extrapolateRight: 'clamp' }),
        }}
      >
        <div
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: 28,
            color: '#d4b8ff',
            fontWeight: 600,
            letterSpacing: '0.04em',
            marginBottom: 8,
          }}
        >
          Cumartesi, 3 Ekim
        </div>
        <div
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 130,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
          }}
        >
          09:41
        </div>
      </div>

      {/* Stacked Notifications Container */}
      <div
        style={{
          position: 'absolute',
          top: 480,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 60px',
          opacity: interpolate(frame, [350, 370], [1, 0], { extrapolateRight: 'clamp' }),
        }}
      >
        {/* Notification 1: Yankı Café Scenario */}
        <NotificationItem
          delay={25}
          icon="brand/spekiva-icon.png"
          appTitle="Spekiva • Canlı Senaryo"
          time="Şimdi"
          title="☕ Yankı seni kafede bekliyor!"
          message="Hey! Kahve tezgahı açıldı. Baristadan latte siparişi vermek için hazır mısın?"
          badgeColor="#00f0ff"
        />

        {/* Notification 2: Streak Flame Alert */}
        <NotificationItem
          delay={110}
          icon="17_badge_7day_flame.png"
          appTitle="Spekiva • Streak Uyarısı"
          time="3 dk önce"
          title="🔥 7 Günlük Ateş Serin Tehlikede!"
          message="Günün konuşma oturumunu tamamla, serini koru ve Korkusuz Rozeti kazan!"
          badgeColor="#ff5500"
        />

        {/* Notification 3: Scorecard Celebration */}
        <NotificationItem
          delay={200}
          icon="14_badge_first_mic.png"
          appTitle="Spekiva • Seviye Raporu"
          time="15 dk önce"
          title="🎯 Tebrikler! %96 Akıcılık Skoru"
          message="İş mülakatı simülasyonunu başarıyla tamamladın. Duraksama sıfıra indi!"
          badgeColor="#8c52ff"
        />
      </div>

      {/* Bottom Hint */}
      {frame < 360 && (
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            width: '100%',
            textAlign: 'center',
            color: '#a5a0c8',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 24,
            fontWeight: 600,
            opacity: interpolate(frame, [25, 40], [0, 0.8], { extrapolateRight: 'clamp' }),
          }}
        >
          Bildirime dokun ve konuşmaya başla 👆
        </div>
      )}

      {/* Outro Screen (Frame 360 - 480) */}
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
              transform: `scale(${outroSpring})`,
              width: 200,
              height: 200,
              borderRadius: 50,
              overflow: 'hidden',
              boxShadow: '0 0 60px rgba(140, 82, 255, 0.8)',
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

          <h1
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 82,
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 16px 0',
              background: 'linear-gradient(90deg, #ffffff 0%, #00f0ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Spekiva
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
            Günde 5 Dakika Pratikle Akıcı İngilizce.
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
            Hemen İndir • Ücretsiz Başla ➔
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
