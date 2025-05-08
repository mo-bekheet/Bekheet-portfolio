import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'public/_redirects',
            dest: ''
          },
          {
            src: 'public/_headers',
            dest: ''
          }
        ]
      })
    ],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_AI_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            'Authorization': `Bearer ${env.VITE_AI_API_KEY}`
          }
        }
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            threejs: ['three', '@react-three/fiber', '@react-three/drei']
          }
        }
      },
      assetsDir: 'assets',
      copyPublicDir: true
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'three']
    }
  }
})
