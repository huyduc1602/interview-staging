/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_GOOGLE_SHEET_API_KEY: string
    readonly VITE_SPREADSHEET_ID: string
    readonly VITE_OPENCHAT_API_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}