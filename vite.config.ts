/// <reference types="vitest" />
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['app/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
    },
  },
  ssr: {
    noExternal: ['posthog-js', 'posthog-js/react'],
  },
});
