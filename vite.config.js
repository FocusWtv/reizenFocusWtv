import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const r2UploadTarget = env.VITE_R2_UPLOAD_DEV_API || 'http://127.0.0.1:8787'

  return {
    plugins: [react()],
    base: '/',
    server: {
      proxy: {
        '/api/upload-to-r2': {
          target: r2UploadTarget,
          changeOrigin: true,
        },
      },
    },
  }
})
