import { parseWithZod } from '@conform-to/zod/v4';
import { useFetcher } from 'react-router';
import { z } from 'zod/v4';
import { useRequestInfo } from './request-info';
import { useHints } from './client-hints';

export type Theme = 'light' | 'dark';

export const ThemeFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
});

export const THEME_FETCHER_KEY = 'THEME_FETCHER';

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export function useTheme() {
  const hints = useHints();
  const requestInfo = useRequestInfo();
  console.log('🚀 ~ useTheme:', { requestInfo, hints });
  const optimisticMode = useOptimisticThemeMode();
  if (optimisticMode) {
    return optimisticMode === 'system' ? hints.theme : optimisticMode;
  }

  return requestInfo.userPrefs.theme ?? hints.theme;
}

/**
 * If the user's changing their theme mode preference, this will return the
 * value it's being changed to.
 */
export function useOptimisticThemeMode() {
  const themeFetcher = useFetcher({ key: THEME_FETCHER_KEY });

  if (themeFetcher.formData) {
    const submission = parseWithZod(themeFetcher.formData, {
      schema: ThemeFormSchema,
    });
    if (submission.status === 'success') {
      console.log('🚀 ~ useOptimisticThemeMode:', { theme: submission.value.theme });
      return submission.value.theme;
    }
    return null;
  }
}
