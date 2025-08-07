import { Monitor, Moon, Sun } from 'lucide-react';
import { useFetcher } from 'react-router';
import { Button } from '~/components/ui/button';
import { useRequestInfo } from '~/lib/request-info';
import { THEME_FETCHER_KEY, useOptimisticThemeMode } from '~/lib/theme';
import { cn } from '~/lib/utils';

const iconBaseClass =
  'absolute inset-0 flex items-center justify-center transition-transform duration-700 motion-reduce:duration-[0s]';

const currentIconClass = 'translate-x-0 rotate-0';
const nextIconClass = '-translate-x-8 translate-y-8 -rotate-90';
const prevIconClass = 'translate-x-8 translate-y-8 rotate-90';

const ThemeToggle = () => {
  const requestInfo = useRequestInfo();
  const fetcher = useFetcher({ key: THEME_FETCHER_KEY });

  const optimisticMode = useOptimisticThemeMode();
  const mode = optimisticMode ?? requestInfo.userPrefs.theme ?? 'system';
  const nextMode = mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system';

  return (
    <fetcher.Form className="flex" method="POST" action="/action/set-theme">
      <input type="hidden" name="theme" value={nextMode} />
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className="text-muted-foreground hover:text-primary w-9.5 h-8 overflow-hidden p-0 transition-colors duration-300"
        aria-label={`Switch to ${nextMode} mode`}
      >
        <div className="relative h-full w-full">
          <span
            className={cn(
              iconBaseClass,
              mode === 'light'
                ? currentIconClass
                : nextMode === 'light'
                  ? nextIconClass
                  : prevIconClass,
            )}
          >
            <Sun size={20} aria-hidden="true" />
          </span>
          <span
            className={cn(
              iconBaseClass,
              mode === 'dark'
                ? currentIconClass
                : nextMode === 'dark'
                  ? nextIconClass
                  : prevIconClass,
            )}
          >
            <Moon size={20} aria-hidden="true" />
          </span>
          <span
            className={cn(
              iconBaseClass,
              mode === 'system'
                ? currentIconClass
                : nextMode === 'system'
                  ? nextIconClass
                  : prevIconClass,
            )}
          >
            <Monitor size={20} aria-hidden="true" />
          </span>
        </div>
      </Button>
    </fetcher.Form>
  );
};

export default ThemeToggle;
