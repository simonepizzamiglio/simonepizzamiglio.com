import type { Config } from '@react-router/dev/config';
import { vercelPreset } from '@vercel/react-router/vite';

const ssrOnlyPaths = ['/resume'];

export default {
  ssr: true,
  prerender: ({ getStaticPaths }) => {
    const paths = getStaticPaths();
    return paths.filter((path) => !ssrOnlyPaths.includes(path));
  },
  presets: [vercelPreset()],
} satisfies Config;
