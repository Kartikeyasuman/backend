require('dotenv').config();
const path = require('path');

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    path.join(__dirname, 'src/entities/*.js')
  ],
  synchronize: true
};
