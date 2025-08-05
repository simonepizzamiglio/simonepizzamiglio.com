import type { Config } from '@react-router/dev/config';

const ssrOnlyPaths = ['/resume'];

export default {
  ssr: true,
  prerender: ({ getStaticPaths }) => {
    const paths = getStaticPaths();
    return paths.filter((path) => !ssrOnlyPaths.includes(path));
  },
} satisfies Config;
