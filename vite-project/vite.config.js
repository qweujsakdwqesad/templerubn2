import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5000, // Specify your port
    cors: {
      origin: '*', // Allow all origins (for development purposes)
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type']
    },
    open: true // Automatically open the browser
  }
});
