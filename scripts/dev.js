const { spawn } = require('child_process');

console.log('Starting development servers...\n');

// Start serverless offline
const serverless = spawn('npm', ['run', 'sls:offline'], {
  stdio: 'inherit',
  shell: true
});

// Wait a bit for serverless to start, then start Next.js
setTimeout(() => {
  console.log('\nStarting Next.js development server...\n');
  const nextjs = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\nShutting down servers...');
    serverless.kill();
    nextjs.kill();
    process.exit();
  });
}, 3000);