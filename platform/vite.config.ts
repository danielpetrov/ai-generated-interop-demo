import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    // Load .env from parent directory (demo-app/)
    envDir: '..',
})
