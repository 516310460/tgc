module.exports = {
  apps: [
    {
      name: 'CoinPool-h5',
      script: './server/index.js',
      watch: true,
      env: {
        PORT: 3001,
        NODE_ENV: 'development'
      },
      env_devTest: {
        NODE_ENV: 'production',
        NUXT_ENV_PATH: 'dev'
      },
      env_test: {
        NODE_ENV: 'production',
        NUXT_ENV_PATH: 'test'
      },
      env_prd: {
        NODE_ENV: 'production',
        NUXT_ENV_PATH: 'prd'
      }
    }
  ]
}
