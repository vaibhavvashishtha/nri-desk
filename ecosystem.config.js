module.exports = {
  apps: [
    {
      name: 'nri-desk',
      script: 'server.js',
      cwd: '/var/www/nri-desk',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        PORT: 3100,
      },
    },
  ],
}
