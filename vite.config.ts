import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'campus-strategy-diagnosis'
const base = process.env.GITHUB_ACTIONS === 'true' ? `/${repoName}/` : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
