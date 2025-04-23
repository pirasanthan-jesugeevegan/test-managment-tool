const { Sequelize } = require('sequelize');

   function getSequelizeInstance() {
     if (process.env.NODE_ENV === 'production') {
       // Production: Use PostgreSQL
       return new Sequelize(process.env.DATABASE_URL, {
         dialect: 'postgres',
         protocol: 'postgres',
         logging: false,
         dialectOptions: {
           ssl: {
             require: true,
             rejectUnauthorized: false, // This is necessary for some cloud providers
           },
         },
       });
     } else {
       // Development: Use SQLite
       return new Sequelize({
         dialect: 'sqlite',
         storage: 'database/database.sqlite',
         logging: false,
       });
     }
   }

   module.exports = getSequelizeInstance;