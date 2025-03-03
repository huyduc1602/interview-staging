import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    build: {
        sourcemap: true,
        outDir: 'dist',
    },
    server: {
        port: 5173,
    },
    base: '/', // Ensure this is set correctly for Vercel
});