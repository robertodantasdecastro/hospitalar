const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { SRV_PORT, CLIENT_URL, URL } = require("./constants");

//importar o passport middleware
require("./middlewares/passport-middleware");

//iniciar middleware s
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(passport.initialize());

//Importar rotas
const authRoutes = require("./routes/auth");
//

//Inicializar rotas
app.use("/api", authRoutes);

//Iniciar o aplicativo
function appStart() {
  try {
    app.listen(SRV_PORT, () => {
      console.log(`==> Backend iniciado endereço: ${URL}:${SRV_PORT}`);
    });
  } catch (error) {
    console.log(`ERRO: ${error.message}`);
  }
}

appStart();
