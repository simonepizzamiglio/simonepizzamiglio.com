import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';

import type { Route } from './+types/root';
import './styles/SpaceGrotesk.css';
import './styles/app.css';
import Navigation from './components/navigation';
import { PostHogProvider } from './components/providers/posthog-provider';
import { ClientHintCheck, getHints } from './lib/client-hints';
import { getTheme } from './lib/theme.server';
import { useTheme } from './lib/theme';
import { useNonce } from './components/providers/nonce-provider';

export const meta: Route.MetaFunction = () => [
  { title: 'Simone Pizzamiglio' },
  { name: 'description', content: 'Simone Pizzamiglio - Software Engineer' },

  // Open Graph tags
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'Your Website Title' },
  { property: 'og:description', content: 'Your website description' },
  { property: 'og:image', content: '/og-image.jpg' },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },

  // Twitter Card tags
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'Your Website Title' },
  { name: 'twitter:description', content: 'Your website description' },
  { name: 'twitter:image', content: '/og-image.jpg' },
];

export const links: Route.LinksFunction = () => [
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.ico', sizes: '180x180' },
  { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png' },
  { rel: 'icon', href: '/favicon-16x16.png', type: 'image/png' },
  { rel: 'icon', href: '/favicon.ico', type: 'image/png' },
  { rel: 'manifest', href: '/site.webmanifest' },
];

export async function loader({ request }: Route.LoaderArgs) {
  return {
    posthogKey: process.env.POSTHOG_KEY,
    requestInfo: {
      hints: getHints(request),
      userPrefs: {
        theme: getTheme(request),
      },
    },
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useRouteLoaderData<Route.ComponentProps['loaderData']>('root');
  console.log('🚀 ~ Layout ~ loaderData:', loaderData?.requestInfo);
  const posthogKey = loaderData?.posthogKey;
  const theme = useTheme();
  console.log('🚀 ~ Layout ~ theme:', theme);
  const nonce = useNonce();

  return (
    <html lang="en" className={theme}>
      <head>
        <ClientHintCheck nonce={nonce} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PostHogProvider posthogKey={posthogKey}>
          <Navigation />
          <main className="mx-auto max-w-3xl px-6 py-24">{children}</main>
          <ScrollRestoration />
          <Scripts />
        </PostHogProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
  }

  return (
    <main className="flex flex-col items-center gap-4 pt-16">
      <h1 className="text-6xl font-bold">{message}</h1>
      <p className="text-lg">{details}</p>
    </main>
  );
}
