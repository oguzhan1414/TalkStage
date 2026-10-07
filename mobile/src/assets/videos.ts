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

export const mivoVideos = {
  idle: require('../../assets/videos/mivo/mivo_idle_loop.mp4'),
  listening: require('../../assets/videos/mivo/mivo_listening_loop.mp4'),
  thinking: require('../../assets/videos/mivo/mivo_thinking_loop.mp4'),
  speaking: require('../../assets/videos/mivo/mivo_speaking_loop.mp4'),
  flip: require('../../assets/videos/mivo/mivo_navigation_flip.mp4'),
  tap: require('../../assets/videos/mivo/mivo_tap_reaction.mp4'),
  success: require('../../assets/videos/mivo/mivo_success_jump.mp4'),
};
