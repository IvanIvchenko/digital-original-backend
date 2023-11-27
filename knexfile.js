// Update with your config settings.
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_DEV_HOST,
      database: process.env.DB_DEV_NAME,
      user: process.env.DB_DEV_USERNAME,
      password: process.env.DB_DEV_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
  },

};