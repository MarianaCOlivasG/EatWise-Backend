module.exports = {
    apps: [
      {
        name: 'octram-eats-server',
        script: './dist/app.js',
        exec_mode: 'cluster',
        instances: 'max', 
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  
