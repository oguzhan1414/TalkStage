/**
 * Central registry for static 3D video assets in Spekvia Mobile.
 * Metro requires static string-literal `require()` calls (no dynamic paths).
 */
export const mivoVideos = {
  idle: require('../../assets/videos/mivo/mivo_idle_loop.mp4'),
  listening: require('../../assets/videos/mivo/mivo_listening_loop.mp4'),
  thinking: require('../../assets/videos/mivo/mivo_thinking_loop.mp4'),
  speaking: require('../../assets/videos/mivo/mivo_speaking_loop.mp4'),
  flip: require('../../assets/videos/mivo/mivo_navigation_flip.mp4'),
  tap: require('../../assets/videos/mivo/mivo_tap_reaction.mp4'),
  success: require('../../assets/videos/mivo/mivo_success_jump.mp4'),
  /** 9:16, flat #D9E2F9 background, 4 s loop — Welcome screen (see WelcomeScreen). */
  wave: require('../../assets/videos/mivo/mivo_wave_loop.mp4'),
};
