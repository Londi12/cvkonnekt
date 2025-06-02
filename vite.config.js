import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@headlessui/react', 'react-swipeable'],
          'vendor-utils': ['html2pdf.js']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/[name]-[hash].css';
          }
          return 'assets/[name]-[hash].[ext]';
        }
      }
    },
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@headlessui/react',
      'react-router-dom',
      'react-swipeable',
      'html2pdf.js'
    ]
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@utils': resolve(__dirname, './utils')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  server: {
    port: 8080,
    strictPort: true,
    hmr: {
      overlay: true
    }
  },
  preview: {
    port: 3000,
    strictPort: true
  },
  publicDir: 'public'
});
