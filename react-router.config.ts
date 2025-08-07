import type { Config } from '@react-router/dev/config';
import { vercelPreset } from '@vercel/react-router/vite';

const notPrerenderPaths = ['/resume', '/action/set-theme'];

export default {
  ssr: true,
  prerender: ({ getStaticPaths }) => {
    const paths = getStaticPaths();
    return paths.filter((path) => !notPrerenderPaths.includes(path));
  },
  presets: [vercelPreset()],
} satisfies Config;
