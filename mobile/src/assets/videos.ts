/**
 * Central registry for static 3D video assets in TalkStage Mobile.
 * Metro requires static string-literal `require()` calls (no dynamic paths).
 */
export const mayaSpeakingVideo = require('../../assets/videos/maya_speaking.mp4');
export const mayaIdleVideo = require('../../assets/videos/maya_idle.mp4');

export const mayaVideos = {
  speaking: mayaSpeakingVideo,
  idle: mayaIdleVideo,
};
