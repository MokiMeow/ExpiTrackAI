// This script runs the development server
import { spawn } from 'child_process';

// Set environment variables
process.env.LOCAL_SERVER = 'true';
process.env.PORT = process.env.PORT || '3000';
process.env.NODE_ENV = 'development';

// Start the server using tsx for TypeScript support
const server = spawn('tsx', ['server/index.ts'], {
  stdio: 'inherit',
  env: process.env
});

server.on('close', (code) => {
  console.log(`Development server process exited with code ${code}`);
});