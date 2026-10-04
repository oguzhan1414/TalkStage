import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const VintageNewspaperReels: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera zoom in on newspaper
  const zoom = interpolate(frame, [0, 200, 360], [0.95, 1.05, 1.15], {
    extrapolateRight: 'clamp',
  });

  const headlineSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const stampSpring = spring({
    frame: Math.max(0, frame - 160),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const outroOpacity = interpolate(frame, [350, 375], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ede3cc',
        overflow: 'hidden',
        color: '#1a1614',
      }}
    >
      {/* Vintage Paper Texture & Vignette */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, #f7f0df 0%, #ecdcb8 75%, #d8c49d 100%)',
          boxShadow: 'inset 0 0 100px rgba(80, 50, 20, 0.3)',
        }}
      />

      {/* Main Newspaper Layout */}
      <div
        style={{
          transform: `scale(${zoom})`,
          width: '100%',
          height: '100%',
          padding: '80px 50px',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          opacity: interpolate(frame, [345, 365], [1, 0], { extrapolateRight: 'clamp' }),
        }}
      >
        {/* Newspaper Top Header / Masthead */}
        <div style={{ textAlign: 'center', borderBottom: '4px double #1a1614', paddingBottom: 16 }}>
          <div
            style={{
              fontFamily: 'serif, Georgia, Times New Roman',
              fontSize: 22,
              letterSpacing: '0.25em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#3d342a',
            }}
          >
            ★ GÜNLÜK ARAŞTIRMA BÜLTENİ • ÖZEL BASKI ★
          </div>
          <h1
            style={{
              fontFamily: 'serif, Georgia, Times New Roman',
              fontSize: 76,
              fontWeight: 900,
              letterSpacing: '-0.02em',
              margin: '8px 0',
              textTransform: 'uppercase',
              color: '#120f0c',
            }}
          >
            THE DAILY SPEAKING
          </h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid #1a1614',
              paddingTop: 8,
              fontFamily: 'monospace',
              fontSize: 18,
              color: '#4a4035',
            }}
          >
            <span>YIL: 2026 • SAYI: 412</span>
            <span>TÜRKİYE GENELİ DİL RAPORU</span>
            <span>FİYAT: 5 DAKİKA</span>
          </div>
        </div>

        {/* Breaking News Alert Ribbon */}
        <div
          style={{
            backgroundColor: '#a31d1d',
            color: '#fff',
            fontFamily: 'system-ui, sans-serif',
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '0.1em',
            padding: '10px 24px',
            marginTop: 24,
            marginBottom: 24,
            display: 'inline-block',
            alignSelf: 'flex-start',
            borderRadius: 4,
            boxShadow: '0 4px 12px rgba(163, 29, 29, 0.4)',
          }}
        >
          ● FLAŞ RAPOR
        </div>

        {/* Giant Newspaper Headline */}
        <div style={{ transform: `scale(${headlineSpring})` }}>
          <h2
            style={{
              fontFamily: 'serif, Georgia, Times New Roman',
              fontSize: 66,
              fontWeight: 900,
              lineHeight: 1.15,
              color: '#0e0b08',
              margin: '0 0 24px 0',
              letterSpacing: '-0.03em',
            }}
          >
            TÜRKİYE'DE %88 'ANLIYORUM AMA KONUŞAMIYORUM' DİYOR!
          </h2>
        </div>

        {/* Sub-headline / Expose */}
        <div
          style={{
            borderLeft: '4px solid #1a1614',
            paddingLeft: 20,
            marginBottom: 36,
            fontFamily: 'serif, Georgia',
            fontSize: 28,
            fontStyle: 'italic',
            lineHeight: 1.4,
            color: '#383025',
          }}
        >
          "Gramer kuralı ezberlemek dili konuşturmuyor. Uzmanlar 'Sessiz Donma' (Silent Freeze)
          sendromuna karşı tek çözümün yapay zeka ile günlük canlı konuşma olduğunu açıkladı."
        </div>

        {/* Newspaper 2-Column Mock Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 30,
            borderTop: '1px solid #73644f',
            paddingTop: 20,
            fontFamily: 'serif, Georgia',
            fontSize: 20,
            lineHeight: 1.45,
            color: '#2b2319',
          }}
        >
          <div>
            <p style={{ margin: '0 0 16px 0' }}>
              <strong>İSTANBUL —</strong> Yıllarca kurslara gidip kelime listeleri ezberleyen milyonlarca
              öğrenci, yabancı birisiyle karşılaştığında tek kelime edemiyor.
            </p>
            <p style={{ margin: 0 }}>
              Beyin, gerçek bir konuşma partneriyle pratik yapmadığında bildiği kelimeleri kilitliyor.
            </p>
          </div>
          <div>
            <p style={{ margin: '0 0 16px 0' }}>
              <strong>YENİ ÇÖZÜM —</strong> TalkStage adı verilen yapay zeka konuşma motoru, kafede
              kahve siparişinden vize mülakatına kadar gerçek hayat simülasyonları sunuyor.
            </p>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
              Korku duvarı günde 5 dakikada yıkılıyor.
            </p>
          </div>
        </div>

        {/* Red Ink Rubber Stamp / Stamp Seal (TalkStage Çözüm) */}
        {frame >= 150 && (
          <div
            style={{
              position: 'absolute',
              bottom: 220,
              right: 60,
              transform: `scale(${stampSpring}) rotate(-12deg)`,
              border: '6px dashed #a31d1d',
              padding: '18px 36px',
              borderRadius: 16,
              color: '#a31d1d',
              fontFamily: 'monospace, sans-serif',
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(255, 245, 235, 0.92)',
              boxShadow: '0 10px 25px rgba(163, 29, 29, 0.35)',
            }}
          >
            ✓ ÇÖZÜM BULUNDU: TALKSTAGE
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
            backgroundColor: '#1c1712',
            color: '#f5ecd8',
          }}
        >
          <div
            style={{
              width: 190,
              height: 190,
              borderRadius: 48,
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9)',
              border: '3px solid #d4c5a9',
              marginBottom: 36,
            }}
          >
            <img
              src={staticFile('brand/talkstage-mark.png')}
              alt="TalkStage"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <h2
            style={{
              fontFamily: 'serif, Georgia',
              fontSize: 78,
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 16px 0',
              textAlign: 'center',
            }}
          >
            Sessizliği Boz.
          </h2>

          <p
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: 32,
              fontWeight: 600,
              color: '#d4c5a9',
              margin: '0 0 46px 0',
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: 760,
            }}
          >
            TalkStage ile korkmadan, hata yaparak, konuşarak öğren.
          </p>

          <div
            style={{
              backgroundColor: '#a31d1d',
              color: '#ffffff',
              borderRadius: 50,
              padding: '24px 60px',
              fontFamily: 'system-ui, sans-serif',
              fontSize: 32,
              fontWeight: 800,
              boxShadow: '0 10px 30px rgba(163, 29, 29, 0.6)',
            }}
          >
            Şimdi İndir • Ücretsiz Başla ➔
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
