import * as path from 'path'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    // ...rest of your Vite config
})