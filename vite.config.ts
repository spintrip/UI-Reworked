import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: 'build',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Set the entry point for your app
    },
  },
  css: {
    postcss: {
      plugins: [
        require('autoprefixer')({
          // Add options if needed
        }),
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    port: 3000,
    proxy: {
      // Add proxy configurations here if needed
    },
  },
  plugins: [react()],
});
