require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  database: {
    url: process.env.DATABASE_URL,
    options: {
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development',
    },
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION || '15m',
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION || '7d',
  },
  email: {
    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
    from: process.env.EMAIL_FROM,
  },
};