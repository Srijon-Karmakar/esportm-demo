// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// export default defineConfig({
//   server:{
//     host: true,
//     proxy: {
//       '/api': 'http://localhost:5000', 
//     }
//   },
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  server: {
    host: '0.0.0.0',         // ← Makes server accessible on network
    port: 5173,              // Optional: fix the port
    strictPort: true,        // Optional: ensures fixed port
    // hmr: {
    //   protocol: 'ws',
    //   host: '192.168.1.118',   // ← Your local IP here
    //   port: 5173
    // },
    proxy: {
      // '/api': 'http://localhost:5000' 
       "/api": { target: "http://localhost:5000", changeOrigin: true },
        "/socket.io": { target: "http://localhost:5000", ws: true },
    }
  },
  plugins: [react(), svgr()],
});

