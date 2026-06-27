import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Keep port 4321 so existing tooling/launch config stays valid.
export default defineConfig({
  plugins: [react()],
  server: { port: 4321 },
  preview: { port: 4321 },
});
