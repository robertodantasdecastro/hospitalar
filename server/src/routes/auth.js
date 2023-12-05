const { Router } = require("express");
// Arquivo destinado as configurações e acesso de usuarios
const {
  VerUsuarios,
  VerCargos,
  tipoAcesso,
  acesso,
  addUser,
  logout,
  login,
  USRlogado,
  id_usr_logado,
} = require("../controllers/auth");
const {
  UF,
  cidades,
  CEP,
  tipoEndereco,
  bairros,
  logradouro,
  decobrirCEP,
  decobrirCEPsemBairro,
} = require("../controllers/enderecos");
// Arquivos de validação e segurança
const { validarCampos } = require("../middlewares/retornarErro");
const { validarRegistro, validarLogin } = require("../validators/auth");
const { proteger } = require("../middlewares/proteger");

// arquivos gerais
const { expSegura } = require("../controllers/paginas");
const {
  TodasTarefas,
  UsrLogadoTarefas,
  FiltroTarefas,
  FiltrarUsuarioTarefas,
} = require("../controllers/tarefas");

const router = Router();

//Páginas GET
router.get("/expSegura", proteger, expSegura);
router.get("/TodasTarefas", proteger, TodasTarefas);
router.get("/UsrLogadoTarefas", proteger, UsrLogadoTarefas);
router.post("/FiltrarUsuarioTarefas", proteger, FiltrarUsuarioTarefas);

//Páginas do arquivo -> auth.js -<
//Páginas POST
router.post("/addUser", validarRegistro, validarCampos, addUser);
router.post("/login", validarLogin, validarCampos, login);
router.post("/cidades", cidades);
router.post("/CEP", CEP);
router.post("/bairros", bairros);
router.post("/logradouro", logradouro);
router.post("/decobrirCEPsemBairro", decobrirCEPsemBairro);
router.post("/decobrirCEP", decobrirCEP);
//Páginas GET
router.get("/id_usr_logado", proteger, id_usr_logado);
router.get("/tipoEndereco", tipoEndereco);
router.get("/USRlogado", proteger, USRlogado);
router.get("/VerUsuarios", proteger, VerUsuarios);
router.get("/VerCargos", VerCargos);
router.get("/logout", logout);
router.get("/tipoAceso", tipoAcesso);
router.get("/acesso", acesso);
router.get("/UF", UF);

//Fim da página do arquivo -> auth.js -<

module.exports = router;
