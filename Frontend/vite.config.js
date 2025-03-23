import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000, // Change Vite's port to 3000
    strictPort: true // Ensures it doesn't switch to another port if 3000 is in use
  }
})
