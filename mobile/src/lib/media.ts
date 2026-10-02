import { Platform } from 'react-native';

/**
 * Resolves a central video/image asset path into a fully qualified URL reachable by mobile.
 * In development, points to the FastAPI backend or configured EXPO_PUBLIC_API_BASE_URL.
 */
export function resolveMediaUrl(pathOrUrl?: string): string {
  if (!pathOrUrl) return '';
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  const baseUrl = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  const resolvedBase =
    Platform.OS === 'android' && baseUrl.includes('localhost')
      ? baseUrl.replace('localhost', '10.0.2.2')
      : baseUrl;

  // Clean leading slashes
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl.slice(1) : pathOrUrl;
  const prefix = cleanPath.startsWith('videos/') ? '' : 'videos/';

  return `${resolvedBase}/${prefix}${cleanPath}`;
}

/**
 * Resolves a video step MP4 file inside a scenario directory.
 */
export function resolveVideoUrl(videoPath?: string, videoFile?: string): string {
  if (!videoPath || !videoFile) return '';
  return resolveMediaUrl(`${videoPath}/${videoFile}`);
}
