// frontend/vite.config.js - Configuration finale pour Docker
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0', // Crucial pour Docker
    proxy: {
      '/api': {
        // ✅ Dans Docker, utiliser le nom du service backend
        target: 'http://backend:3000',
        changeOrigin: true,
        secure: false,
        timeout: 60000,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('🔴 Proxy Error:', err.message);
            console.log('   Target:', options.target);
            console.log('   Request:', req.method, req.url);
            
            if (!res.headersSent) {
              res.writeHead(503, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              });
              res.end(JSON.stringify({
                error: 'Backend unavailable',
                message: 'Cannot connect to backend service',
                target: options.target
              }));
            }
          });

          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('🔄 Proxying:', req.method, req.url, '→', options.target + req.url);
          });

          proxy.on('proxyRes', (proxyRes, req, res) => {
            const status = proxyRes.statusCode;
            const icon = status < 400 ? '✅' : '❌';
            console.log(`${icon} Response: ${status} ${req.method} ${req.url}`);
          });
        }
      }
    },
    cors: {
      origin: ['http://backend:3000'],
      credentials: true
    }
  },
  define: {
    global: 'globalThis',
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  }
})
