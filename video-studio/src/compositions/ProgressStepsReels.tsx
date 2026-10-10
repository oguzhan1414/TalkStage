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

interface StepProps {
  level: string;
  title: string;
  desc: string;
  badge: string;
  color: string;
  active: boolean;
}

const StepCard: React.FC<StepProps> = ({ level, title, desc, badge, color, active }) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 960,
        backgroundColor: active ? 'rgba(35, 26, 68, 0.95)' : 'rgba(20, 16, 36, 0.65)',
        backdropFilter: 'blur(20px)',
        borderRadius: 28,
        padding: '24px 32px',
        border: active ? `2.5px solid ${color}` : '1.5px solid rgba(255, 255, 255, 0.1)',
        boxShadow: active
          ? `0 20px 45px rgba(0, 0, 0, 0.7), 0 0 35px ${color}66`
          : '0 10px 30px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        transform: active ? 'scale(1.03)' : 'scale(1)',
        marginBottom: 20,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Level Tag */}
        <div
          style={{
            backgroundColor: color,
            color: '#fff',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 24,
            fontWeight: 800,
            padding: '10px 18px',
            borderRadius: 16,
            boxShadow: `0 0 16px ${color}`,
          }}
        >
          {level}
        </div>

        <div>
          <h4
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 28,
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 0 4px 0',
            }}
          >
            {title}
          </h4>
          <span style={{ color: '#a5a0c8', fontSize: 20, fontWeight: 500 }}>
            {desc}
          </span>
        </div>
      </div>

      <img
        src={staticFile(badge)}
        alt={title}
        style={{
          width: 58,
          height: 58,
          filter: active ? `drop-shadow(0 0 14px ${color})` : 'grayscale(60%)',
        }}
      />
    </div>
  );
};

export const ProgressStepsReels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Active step calculation
  // 0 - 60: Step 1 (A1)
  // 60 - 140: Step 2 (A2)
  // 140 - 220: Step 3 (B1)
  // 220 - 360: Step 4 (B2)
  // 360 - 480: Outro

  const currentStep = frame < 80 ? 1 : frame < 170 ? 2 : frame < 260 ? 3 : 4;

  const ballY = interpolate(
    frame,
    [0, 80, 170, 260],
    [400, 530, 660, 790],
    { extrapolateRight: 'clamp' }
  );

  const outroOpacity = interpolate(frame, [360, 385], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0814', overflow: 'hidden' }}>
      <Background />

      {/* Header */}
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
          Konuşma Haritan Seni Bekliyor
        </span>
        <h1
          style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: 66,
            fontWeight: 900,
            color: '#ffffff',
            margin: '12px 0 0 0',
          }}
        >
          Sıfırdan Akıcılığa 4 Adım
        </h1>
      </div>

      {/* 4 Steps Container */}
      <div
        style={{
          position: 'absolute',
          top: 360,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 60px',
          opacity: interpolate(frame, [350, 370], [1, 0], { extrapolateRight: 'clamp' }),
        }}
      >
        <StepCard
          level="A1"
          title="Günlük Tanışma & Sipariş"
          desc="Kafede kahve söyle, kendini tanıt"
          badge="14_badge_first_mic.png"
          color="#00f0ff"
          active={currentStep === 1}
        />

        <StepCard
          level="A2"
          title="Seyahat & Havalimanı"
          desc="Bavul teslim, otel rezervasyonu"
          badge="17_badge_7day_flame.png"
          color="#8c52ff"
          active={currentStep === 2}
        />

        <StepCard
          level="B1"
          title="İş & Vize Mülakatı"
          desc="Kendini savun, kariyerini anlat"
          badge="14_badge_first_mic.png"
          color="#f59e0b"
          active={currentStep === 3}
        />

        <StepCard
          level="B2"
          title="Akıcı & Doğal İngilizce"
          desc="Duraksamadan saatlerce konuş"
          badge="17_badge_7day_flame.png"
          color="#10b981"
          active={currentStep === 4}
        />
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
              boxShadow: '0 0 60px rgba(16, 185, 129, 0.8)',
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
              fontSize: 78,
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 16px 0',
              textAlign: 'center',
            }}
          >
            Hedefine Ulaş.
          </h2>

          <p
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 34,
              fontWeight: 700,
              color: '#10b981',
              margin: '0 0 50px 0',
              textAlign: 'center',
            }}
          >
            Spekiva ile Kendi Seviyenden Başla.
          </p>

          <div
            style={{
              background: 'linear-gradient(90deg, #10b981 0%, #00f0ff 100%)',
              borderRadius: 60,
              padding: '26px 64px',
              color: '#ffffff',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 32,
              fontWeight: 800,
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.5)',
            }}
          >
            Seviyeni Şimdi Test Et ➔
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
