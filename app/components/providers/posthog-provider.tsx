import { useEffect, useState } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

function PHProviderInternal({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    posthog.init(process.env.POSTHOG_KEY!, {
      api_host: 'https://eu.i.posthog.com',
      defaults: '2025-05-24',
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    });

    setHydrated(true);
  }, []);

  if (!hydrated) return <>{children}</>;
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test' ||
    process.env.POSTHOG_KEY === undefined
  ) {
    return <>{children}</>;
  }
  return <PHProviderInternal>{children}</PHProviderInternal>;
}
