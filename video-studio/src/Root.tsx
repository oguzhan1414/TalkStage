import React from 'react';
import { Composition } from 'remotion';
import { AppleStyleReels } from './compositions/AppleStyleReels';
import { CinematicNavyReels } from './compositions/CinematicNavyReels';
import { ComparisonReels } from './compositions/ComparisonReels';
import { GoogleSearchReels } from './compositions/GoogleSearchReels';
import { NotificationsReels } from './compositions/NotificationsReels';
import { NotionMinimalReels } from './compositions/NotionMinimalReels';
import { ProgressStepsReels } from './compositions/ProgressStepsReels';
import { QuestionHookReels } from './compositions/QuestionHookReels';
import { VintageNewspaperReels } from './compositions/VintageNewspaperReels';
import { TalkStageReels } from './TalkStageReels';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ============================================================== */}
      {/* YENİ NON-PURPLE 4 ŞABLON (1, 2, 4, 5) */}
      {/* ============================================================== */}

      {/* 1. 📰 Eski Gazete & Araştırma Dosyası (Warm Sepia / Black Ink) */}
      <Composition
        id="TalkStageVintageNewspaper"
        component={VintageNewspaperReels}
        durationInFrames={420}
        fps={60}
        width={1080}
        height={1920}
      />

      {/* 2. 🔍 Google Arama Çubuğu Kancası (Temiz Beyaz & Google Renkleri) */}
      <Composition
        id="TalkStageGoogleSearch"
        component={GoogleSearchReels}
        durationInFrames={420}
        fps={60}
        width={1080}
        height={1920}
      />

      {/* 4. ⚪ Notion / Apple Tarzı Ultra Minimalist Beyaz & Gri */}
      <Composition
        id="TalkStageNotionMinimal"
        component={NotionMinimalReels}
        durationInFrames={420}
        fps={60}
        width={1080}
        height={1920}
      />

      {/* 5. 🎬 Sinematik Derin Gece Mavisi & Kehribar (Widescreen Teaser) */}
      <Composition
        id="TalkStageCinematicNavy"
        component={CinematicNavyReels}
        durationInFrames={450}
        fps={60}
        width={1080}
        height={1920}
      />

      {/* ============================================================== */}
      {/* DİĞER HAZIR ŞABLONLAR */}
      {/* ============================================================== */}
      <Composition
        id="TalkStageNotifications"
        component={NotificationsReels}
        durationInFrames={480}
        fps={60}
        width={1080}
        height={1920}
      />

      <Composition
        id="TalkStageComparison"
        component={ComparisonReels}
        durationInFrames={480}
        fps={60}
        width={1080}
        height={1920}
      />

      <Composition
        id="TalkStageAppleStyle"
        component={AppleStyleReels}
        durationInFrames={450}
        fps={60}
        width={1080}
        height={1920}
      />

      <Composition
        id="TalkStageProgressSteps"
        component={ProgressStepsReels}
        durationInFrames={480}
        fps={60}
        width={1080}
        height={1920}
      />

      <Composition
        id="TalkStageQuestionHook"
        component={QuestionHookReels}
        durationInFrames={420}
        fps={60}
        width={1080}
        height={1920}
      />

      <Composition
        id="TalkStageReels"
        component={TalkStageReels}
        durationInFrames={480}
        fps={60}
        width={1080}
        height={1920}
      />
    </>
  );
};
