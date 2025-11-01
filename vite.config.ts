import { defineConfig } from 'vitest/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: [
        'src/main.tsx',
        'src/**/*.d.ts',
        'src/types/*',
        'src/lib/*',
        'src/components/ui/*',
        'src/pages/*',
        'src/layouts/*',
        'src/stores/*',
        'src/assets/*',
        'src/services/*',
        'src/App.tsx',
        'src/main.tsx',
      ],
    },
  },
});
