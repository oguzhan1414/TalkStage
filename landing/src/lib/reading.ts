import { api } from './api';
import type { ReadingPassageOut } from '@/types/api';

/** Thin wrappers around the real `/reading` endpoints (backend/app/api/routes/reading.py)
 * — same data mobile's Reading module already uses, no fake/local content on web. */

export function listReadingPassages(): Promise<ReadingPassageOut[]> {
  return api.get<ReadingPassageOut[]>('/reading');
}

export function getReadingPassage(slug: string): Promise<ReadingPassageOut> {
  return api.get<ReadingPassageOut>(`/reading/${slug}`);
}

export function getCompletedReadingSlugs(): Promise<string[]> {
  return api.get<string[]>('/reading/completed-slugs');
}

export function completeReadingPassage(slug: string): Promise<void> {
  return api.post<void>(`/reading/${slug}/complete`);
}
