import { Sun, Moon, Monitor } from 'lucide-react';
import { useFetcher } from 'react-router';
import { Button } from '~/components/ui/button';
import { useRequestInfo } from '~/lib/request-info';
import { THEME_FETCHER_KEY, useOptimisticThemeMode } from '~/lib/theme';

const ThemeToggle = () => {
  const requestInfo = useRequestInfo();
  const fetcher = useFetcher({ key: THEME_FETCHER_KEY });

  const optimisticMode = useOptimisticThemeMode();
  const mode = optimisticMode ?? requestInfo.userPrefs.theme ?? 'system';
  const nextMode = mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system';

  return (
    <fetcher.Form method="POST" action="/action/set-theme">
      <input type="hidden" name="theme" value={nextMode} />
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className="p-2 text-muted-foreground transition-colors duration-300 hover:text-primary"
        aria-label={`Switch to ${nextMode} mode`}
      >
        {(() => {
          switch (mode) {
            case 'light':
              return <Sun size={20} aria-hidden="true" />;
            case 'dark':
              return <Moon size={20} aria-hidden="true" />;
            default:
              return <Monitor size={20} aria-hidden="true" />;
          }
        })()}
      </Button>
    </fetcher.Form>
  );
};

export default ThemeToggle;
