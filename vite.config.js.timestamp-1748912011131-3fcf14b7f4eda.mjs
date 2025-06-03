// vite.config.js
import { defineConfig } from "file:///C:/Users/Londi/Desktop/projects/resumebuilder/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Londi/Desktop/projects/resumebuilder/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import tailwindcss from "file:///C:/Users/Londi/Desktop/projects/resumebuilder/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Users/Londi/Desktop/projects/resumebuilder/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Londi/Desktop/projects/resumebuilder/vite.config.js";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  base: "/",
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss("./tailwind.config.js"),
        autoprefixer()
      ]
    }
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    hmr: {
      overlay: true
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    assetsDir: "assets",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": ["@headlessui/react", "react-swipeable"],
          "vendor-utils": ["html2pdf.js"]
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "assets/[name]-[hash].css";
          }
          return "assets/[name]-[hash].[ext]";
        }
      }
    },
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1e3,
    target: "esnext",
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@headlessui/react",
      "react-router-dom",
      "react-swipeable",
      "html2pdf.js"
    ]
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@styles": resolve(__dirname, "./src/styles")
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css"]
  },
  preview: {
    port: 3e3,
    strictPort: true
  },
  publicDir: "public"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMb25kaVxcXFxEZXNrdG9wXFxcXHByb2plY3RzXFxcXHJlc3VtZWJ1aWxkZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXExvbmRpXFxcXERlc2t0b3BcXFxccHJvamVjdHNcXFxccmVzdW1lYnVpbGRlclxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvTG9uZGkvRGVza3RvcC9wcm9qZWN0cy9yZXN1bWVidWlsZGVyL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xyXG5pbXBvcnQgeyBkaXJuYW1lLCByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICd0YWlsd2luZGNzcyc7XHJcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcclxuXHJcbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCk7XHJcbmNvbnN0IF9fZGlybmFtZSA9IGRpcm5hbWUoX19maWxlbmFtZSk7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6ICcvJyxcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgY3NzOiB7XHJcbiAgICBwb3N0Y3NzOiB7XHJcbiAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICB0YWlsd2luZGNzcygnLi90YWlsd2luZC5jb25maWcuanMnKSxcclxuICAgICAgICBhdXRvcHJlZml4ZXIoKSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IDgwODAsXHJcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxyXG4gICAgaG9zdDogdHJ1ZSxcclxuICAgIGhtcjoge1xyXG4gICAgICBvdmVybGF5OiB0cnVlXHJcbiAgICB9XHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiAnZGlzdCcsXHJcbiAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICAgIGFzc2V0c0RpcjogJ2Fzc2V0cycsXHJcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgdGVyc2VyT3B0aW9uczoge1xyXG4gICAgICBjb21wcmVzczoge1xyXG4gICAgICAgIGRyb3BfY29uc29sZTogZmFsc2UsXHJcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogZmFsc2VcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAndmVuZG9yLXJlYWN0JzogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxyXG4gICAgICAgICAgJ3ZlbmRvci11aSc6IFsnQGhlYWRsZXNzdWkvcmVhY3QnLCAncmVhY3Qtc3dpcGVhYmxlJ10sXHJcbiAgICAgICAgICAndmVuZG9yLXV0aWxzJzogWydodG1sMnBkZi5qcyddXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xyXG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lLmVuZHNXaXRoKCcuY3NzJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdhc3NldHMvW25hbWVdLVtoYXNoXS5jc3MnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuICdhc3NldHMvW25hbWVdLVtoYXNoXS5bZXh0XSc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxyXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IHRydWUsXHJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsXHJcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxyXG4gICAgYXNzZXRzSW5saW5lTGltaXQ6IDQwOTZcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogW1xyXG4gICAgICAncmVhY3QnLFxyXG4gICAgICAncmVhY3QtZG9tJyxcclxuICAgICAgJ0BoZWFkbGVzc3VpL3JlYWN0JyxcclxuICAgICAgJ3JlYWN0LXJvdXRlci1kb20nLFxyXG4gICAgICAncmVhY3Qtc3dpcGVhYmxlJyxcclxuICAgICAgJ2h0bWwycGRmLmpzJ1xyXG4gICAgXVxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICAgICdAY29tcG9uZW50cyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvY29tcG9uZW50cycpLFxyXG4gICAgICAnQHV0aWxzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy91dGlscycpLFxyXG4gICAgICAnQHN0eWxlcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvc3R5bGVzJylcclxuICAgIH0sXHJcbiAgICBleHRlbnNpb25zOiBbJy5qcycsICcuanN4JywgJy50cycsICcudHN4JywgJy5qc29uJywgJy5jc3MnXVxyXG4gIH0sXHJcbiAgcHJldmlldzoge1xyXG4gICAgcG9ydDogMzAwMCxcclxuICAgIHN0cmljdFBvcnQ6IHRydWVcclxuICB9LFxyXG4gIHB1YmxpY0RpcjogJ3B1YmxpYydcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVUsU0FBUyxvQkFBb0I7QUFDbFcsT0FBTyxXQUFXO0FBQ2xCLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsU0FBUyxlQUFlO0FBQ2pDLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sa0JBQWtCO0FBTG9MLElBQU0sMkNBQTJDO0FBTzlQLElBQU0sYUFBYSxjQUFjLHdDQUFlO0FBQ2hELElBQU0sWUFBWSxRQUFRLFVBQVU7QUFHcEMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQSxRQUNQLFlBQVksc0JBQXNCO0FBQUEsUUFDbEMsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLElBQ1g7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixnQkFBZ0IsQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsVUFDekQsYUFBYSxDQUFDLHFCQUFxQixpQkFBaUI7QUFBQSxVQUNwRCxnQkFBZ0IsQ0FBQyxhQUFhO0FBQUEsUUFDaEM7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxVQUFVLEtBQUssU0FBUyxNQUFNLEdBQUc7QUFDbkMsbUJBQU87QUFBQSxVQUNUO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGNBQWM7QUFBQSxJQUNkLHNCQUFzQjtBQUFBLElBQ3RCLHVCQUF1QjtBQUFBLElBQ3ZCLFFBQVE7QUFBQSxJQUNSLG1CQUFtQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssUUFBUSxXQUFXLE9BQU87QUFBQSxNQUMvQixlQUFlLFFBQVEsV0FBVyxrQkFBa0I7QUFBQSxNQUNwRCxVQUFVLFFBQVEsV0FBVyxhQUFhO0FBQUEsTUFDMUMsV0FBVyxRQUFRLFdBQVcsY0FBYztBQUFBLElBQzlDO0FBQUEsSUFDQSxZQUFZLENBQUMsT0FBTyxRQUFRLE9BQU8sUUFBUSxTQUFTLE1BQU07QUFBQSxFQUM1RDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLFdBQVc7QUFDYixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
