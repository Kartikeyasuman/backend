require('dotenv').config();
const { createConnection } = require('typeorm');
const app = require('./app');
const ormconfig = require('../ormconfig');

createConnection(ormconfig).then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running...');
  });
}).catch((err) => console.error('DB Connection Error:', err));
