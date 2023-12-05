const {config} = require('dotenv')
config()

module.exports = {
    SECRET: process.env.SECRET,
    URL: process.env.URL,
    SRV_PORT: process.env.SRV_PORT,
    CLT_PORT: process.env.CLT_PORT,
    SERVER_URL: process.env.URL+':'+process.env.SRV_PORT,
    CLIENT_URL: process.env.URL+':'+process.env.CLT_PORT,
    DB_URL: process.env.DB_URL,
    DB_NOME: process.env.DB_NOME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: process.env.DB_PORT,
}