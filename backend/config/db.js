const mysql = require('mysql2');
require('dotenv').config();

function connection() {
  return new Promise((resolve, reject) => {
    // 1. Connect without DB to create the DB if needed
    const initConnection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    initConnection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``, (err) => {
      if (err) {
        console.error('❌ Error creating database:', err);
        return reject(err);
      }
      console.log(`✅ Database ${process.env.DB_NAME} is ready.`);
      initConnection.end();

      // 2. Now connect WITH the database
      const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });

      connection.connect((err) => {
        if (err) {
          console.error('❌ Error connecting to MySQL DB:', err);
          return reject(err);
        }
        console.log('✅ Connected to MySQL DB:', process.env.DB_NAME);

        // 3. Create tables
        const createCampaignsTable = `
          CREATE TABLE IF NOT EXISTS campaigns (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            date DATE,
            impressions INT,
            clicks INT,
            conversions INT
          );
        `;

        const createUsersTable = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255)
          );
        `;

        connection.query(createCampaignsTable, (err) => {
          if (err) return reject(err);
          console.log('✅ Campaigns table is ready.');

          connection.query(createUsersTable, (err) => {
            if (err) return reject(err);
            console.log('✅ Users table is ready.');
            resolve(connection); // ✅ finally return connection
          });
        });
      });
    });
  });
}

module.exports = connection;
