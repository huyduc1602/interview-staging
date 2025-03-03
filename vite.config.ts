import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
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
    base: '/interview.hoanghuyduc.com/',
});