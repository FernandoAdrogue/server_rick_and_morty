require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, POSTGRES_USER, POSTGRES_HOST,POSTGRES_PASSWORD, POSTGRES_DATABASE  } = process.env;
const UserModel = require("./models/User")
const FavoriteModel = require("./models/Favorite")


//Entorno Local
const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ryckandmorty`,
   { logging: false, native: false }
);

//Deploy Vercel
// const sequelize = new Sequelize(
//    `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}/${POSTGRES_DATABASE}`,
//    { logging: false, native: false }
// );


UserModel(sequelize)
FavoriteModel(sequelize)


const { User, Favorite } = sequelize.models

User.belongsToMany(Favorite, {through: "user_favorite", timestamps:false})
Favorite.belongsToMany(User, {through: "user_favorite", timestamps:false})

module.exports = {
   User,
   Favorite,
   conn: sequelize,
};
