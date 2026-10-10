import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const GoogleSearchReels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typing animation in search bar (0 - 90 frames)
  const fullQuery = 'İngilizce konuşurken neden dilim tutuluyor?';
  const typingProgress = Math.min(1, Math.max(0, (frame - 15) / 65));
  const currentQuery = fullQuery.slice(0, Math.floor(typingProgress * fullQuery.length));

  // Search Results slide up after frame 110
  const resultsFrame = Math.max(0, frame - 110);
  const resultsSpring = spring({
    frame: resultsFrame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const resultsOpacity = interpolate(resultsFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const outroOpacity = interpolate(frame, [350, 375], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        color: '#202124',
        fontFamily: 'system-ui, -apple-system, Roboto, sans-serif',
      }}
    >
      {/* Search Interface Container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '120px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
          opacity: interpolate(frame, [345, 365], [1, 0], { extrapolateRight: 'clamp' }),
        }}
      >
        {/* Google Colorful Logo */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 92, fontWeight: 700, color: '#4285F4' }}>G</span>
          <span style={{ fontSize: 92, fontWeight: 700, color: '#EA4335' }}>o</span>
          <span style={{ fontSize: 92, fontWeight: 700, color: '#FBBC05' }}>o</span>
          <span style={{ fontSize: 92, fontWeight: 700, color: '#4285F4' }}>g</span>
          <span style={{ fontSize: 92, fontWeight: 700, color: '#34A853' }}>l</span>
          <span style={{ fontSize: 92, fontWeight: 700, color: '#EA4335' }}>e</span>
        </div>

        {/* Realistic Search Bar */}
        <div
          style={{
            width: '100%',
            maxWidth: 960,
            backgroundColor: '#ffffff',
            borderRadius: 50,
            border: '2px solid #dfe1e5',
            padding: '24px 36px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            marginBottom: 48,
          }}
        >
          {/* Search Icon */}
          <span style={{ fontSize: 32, color: '#9aa0a6' }}>🔍</span>

          {/* Typing Text */}
          <div
            style={{
              flex: 1,
              fontSize: 34,
              fontWeight: 500,
              color: '#202124',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {currentQuery}
            {frame < 110 && (
              <span
                style={{
                  display: 'inline-block',
                  width: 3,
                  height: 36,
                  backgroundColor: '#4285F4',
                  marginLeft: 4,
                  verticalAlign: 'middle',
                  opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
                }}
              />
            )}
          </div>

          {/* Microphone & Lens Icons */}
          <div style={{ display: 'flex', gap: 18, fontSize: 28 }}>
            <span>🎙️</span>
            <span>📷</span>
          </div>
        </div>

        {/* Search Results Dropdown / Answer Box (110 - 350 frames) */}
        {frame >= 105 && (
          <div
            style={{
              opacity: resultsOpacity,
              transform: `translateY(${interpolate(resultsSpring, [0, 1], [40, 0])}px)`,
              width: '100%',
              maxWidth: 960,
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
            }}
          >
            {/* Featured Answer Snippet */}
            <div
              style={{
                backgroundColor: '#f8f9fa',
                border: '1.5px solid #dadce0',
                borderRadius: 32,
                padding: '36px 40px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
              }}
            >
              <div
                style={{
                  color: '#1a73e8',
                  fontSize: 22,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: 12,
                }}
              >
                ★ ÖNE ÇIKAN UZMAN YANITI
              </div>
              <h3
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: '#202124',
                  margin: '0 0 16px 0',
                  lineHeight: 1.25,
                }}
              >
                Sebep: Pasif Ezber & Kas Hafızası Eksikliği
              </h3>
              <p
                style={{
                  fontSize: 26,
                  color: '#4d5156',
                  lineHeight: 1.45,
                  margin: '0 0 20px 0',
                }}
              >
                Kural ezberlemek sadece test çözdürür. Konuşabilmek için beynin gerçek bir
                partnerle anlık soru-cevap pratiği yapması gerekir.
              </p>
              <div
                style={{
                  backgroundColor: '#e8f0fe',
                  color: '#1967d2',
                  padding: '12px 24px',
                  borderRadius: 16,
                  fontSize: 24,
                  fontWeight: 700,
                  display: 'inline-block',
                }}
              >
                💡 Kesin Çözüm: Spekiva AI ile Canlı Senaryolar
              </div>
            </div>

            {/* Organic Search Result Card */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #dfe1e5',
                borderRadius: 28,
                padding: '28px 36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <img
                  src={staticFile('brand/spekiva-icon.png')}
                  alt="Spekiva"
                  style={{ width: 64, height: 64, borderRadius: 16 }}
                />
                <div>
                  <div style={{ fontSize: 18, color: '#202124' }}>spekiva.app</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: '#1a0dab' }}>
                    Spekiva: Speak English Fearlessly
                  </div>
                  <div style={{ fontSize: 20, color: '#4d5156', marginTop: 4 }}>
                    ⭐⭐⭐⭐⭐ 4.9 • 10.000+ Aktif Konuşmacı
                  </div>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: '#1a73e8',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: 24,
                  fontWeight: 700,
                  fontSize: 22,
                }}
              >
                Uygulamayı Aç
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Outro Screen (Frame 350 - 420) */}
      {frame >= 345 && (
        <AbsoluteFill
          style={{
            opacity: outroOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 60px',
            backgroundColor: '#1a73e8',
            color: '#ffffff',
          }}
        >
          <div
            style={{
              width: 190,
              height: 190,
              borderRadius: 48,
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
              border: '4px solid #ffffff',
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
              fontSize: 78,
              fontWeight: 900,
              margin: '0 0 16px 0',
              textAlign: 'center',
            }}
          >
            Aramayı Bırak.
          </h2>

          <p
            style={{
              fontSize: 34,
              fontWeight: 600,
              margin: '0 0 46px 0',
              textAlign: 'center',
              lineHeight: 1.35,
              maxWidth: 760,
            }}
          >
            Spekiva ile Bugün İlk Cümleni Kur.
          </p>

          <div
            style={{
              backgroundColor: '#ffffff',
              color: '#1a73e8',
              borderRadius: 50,
              padding: '24px 64px',
              fontSize: 32,
              fontWeight: 800,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            }}
          >
            Hemen Ücretsiz Başla ➔
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
