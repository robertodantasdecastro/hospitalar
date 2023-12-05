const {config} = require('dotenv')
config()

module.exports = {
    SECRET: process.env.SECRET,
    URL: process.env.URL,
    SRV_PORT: process.env.SRVPORT,
    CLT_PORT: process.env.CLTPORT,
    SERVER_URL: process.env.URL+':'+process.env.SRVPORT,
    CLIENT_URL: process.env.URL+':'+process.env.CLTPORT,
    DB_URL: process.env.DB_URL,
    DB_NOME: process.env.DB_NOME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: process.env.DB_PORT,
}