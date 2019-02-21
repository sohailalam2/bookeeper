const {
  NODE_ENV: env = 'production',
  POSTGRES_DB: dbName = 'postgres',
  POSTGRES_USER: dbUser = 'sohail',
  POSTGRES_PASSWORD: dbPass = 'joba',
  POSTGRES_HOST: dbHost = 'localhost',
  POSTGRES_PORT: dbPort = '5432',
  HOST: host = '0.0.0.0',
  PORT: port = 8080,
} = process.env;

module.exports = {
  env,
  isDev: env === 'development',
  dbHost,
  dbPort,
  dbName,
  dbUser,
  dbPass,
  host,
  port,
};
