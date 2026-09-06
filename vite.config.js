import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Ensures all deep-linked routes (e.g. /category/educational, /product/cute-teddy-bear)
    // serve index.html so React Router can handle them client-side
    historyApiFallback: true
  }
});
