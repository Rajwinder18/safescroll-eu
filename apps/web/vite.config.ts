import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@safescroll/shared-types': fileURLToPath(
        new URL('../../packages/shared-types/src', import.meta.url)
      ),
      '@safescroll/wellbeing-engine': fileURLToPath(
        new URL('../../packages/wellbeing-engine/src', import.meta.url)
      ),
      '@safescroll/validation': fileURLToPath(
        new URL('../../packages/validation/src', import.meta.url)
      ),
      '@safescroll/api-client': fileURLToPath(
        new URL('../../packages/api-client/src', import.meta.url)
      ),
      '@safescroll/policy-content': fileURLToPath(
        new URL('../../packages/policy-content/src', import.meta.url)
      ),
    },
  },
  server: {
    port: 5173,
  },
});
