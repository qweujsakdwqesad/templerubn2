import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3001, // Specify your port
    cors: {
      origin: '*', // Allow all origins (for development purposes)
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type']
    },
    open: true // Automatically open the browser
  }
});
