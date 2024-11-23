import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server : {
    proxy : {
      "/api/v1/" : "https://ecommerce-app-46o8.onrender.com"
    }
  },
  plugins: [react()],
})
