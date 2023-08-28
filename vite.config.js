import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/inc/assets/font/**/*', // Assumes you want to copy all files. Adjust pattern as needed.
          dest: 'inc/fonts',
        },
      ],
    }),
  ],
  build: {
    outDir: 'dist', // This is the default value. Update it if you want to change the entire build directory.
    assetsDir: 'inc/assets', // Setting your custom assets directory.
    rollupOptions: {
      output: {
        entryFileNames: `inc/assets/rotating-carousel.js`,
      },
    },
  },
})
