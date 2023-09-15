const express = require("express")
const morgan = require("morgan")
const server = express()
const router = require("./routes/index")
const {ALLOW_ORIGIN}= process.env

server.use(morgan("dev"))

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${ALLOW_ORIGIN}`);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
     'Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
     'Access-Control-Allow-Methods',
     'GET, POST, OPTIONS, PUT, DELETE'
  );
  next();
});

server.use(express.json())

server.use("/rickandmorty", router)

module.exports = server