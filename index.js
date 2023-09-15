require('dotenv').config()
const { PORT , HOST } = process.env
const {conn} = require("./src/DB_connection")
const server = require("./src/app")

conn.sync({force:true /* alter:true */}).then(()=>{
  server.listen(PORT,()=>{
    console.log(`Server raised in ${HOST}:${PORT}`);
  })
})
 