import { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

export function PostHogProvider({
  children,
  posthogKey,
}: {
  children: React.ReactNode;
  posthogKey?: string;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (posthogKey) {
      posthog.init(posthogKey, {
        api_host: 'https://eu.i.posthog.com',
        defaults: '2025-05-24',
        person_profiles: 'always',
      });

      setHydrated(true);
    }
  }, []);

  if (!hydrated) return <>{children}</>;
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
