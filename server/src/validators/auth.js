const { check } = require("express-validator");
const db = require("../db");
const bcrypt = require("bcrypt");
const { cpf, cnpj } = require("cpf-cnpj-validator");

//validar o usuário
const usuario = check("usuario")
  .isLength({ min: 2, max: 20 })
  .withMessage(
    "O nome de usuário deve ter no mínimo 2 e no máximo 20 caratéres!"
  );

//verifica se o usuario existe no banco de dados
const usuarioExiste = check("usuario").custom(async (value) => {
  const { rows } = await db.query("SELECT * FROM usuarios WHERE usuario = $1", [
    value,
  ]);
  if (rows.length) {
    throw new Error("Este nome de usuário já está sendo usado!");
  }
});

const validarCPF = check("CPF").custom(async (value, { req }) => {
  // Check if the value is a string
  const CPF = value.replace(/[^0-9]/g, "");
  if (typeof CPF !== "string") {
    throw new Error("Informe um CPF válido!");
  }
  if (CPF.length !== 11) {
    throw new Error("O CPF deve conter no mínimo 11 números");
  }
  if (!cpf.isValid(CPF)) {
    throw new Error("3 - Informe um CPF válido!");
  }

  return true;

  //throw new Error("");
  // The value is valid
  //return true;
});

const cpfExiste = check("CPF").custom(async (value) => {
  const { rows } = await db.query("SELECT * FROM usuarios WHERE CPF = $1", [
    value,
  ]);
  if (rows.length) {
    throw new Error("Este CPF já está sendo usado!");
  }
});

// validador de senha - minímo 6 letras máximo 20 letras
const senha = check("senha")
  .isLength({ min: 6, max: 20 })
  .withMessage("A senha deve conter no mínimo 6 e no máximo 20 caratéres!");

// validador de email
const email = check("email").isEmail().withMessage("Informe um e-mail válido!");

// verificar se o email existe no banco de dados
const emailExists = check("email").custom(async (value) => {
  const { rows } = await db.query(
    "SELECT * FROM contatosusr WHERE email = $1",
    [value]
  );
  if (rows.length) {
    throw new Error("O e-mail já está cadastrado!");
  }
});

const cpfExists = check("email").custom(async (value) => {
  const { rows } = await db.query(
    "SELECT * FROM contatosusr WHERE email = $1",
    [value]
  );
  if (rows.length) {
    throw new Error("O e-mail já está cadastrado!");
  }
});

//validar nome completo
const nomecompleto = check("nomecompleto")
  .isLength({ min: 6, max: 150 })
  .withMessage(
    "O nome completo do usuário deve ter no mínimo 6 e no máximo 150 caratéres!"
  );

const validarCamposLogin = check("usuario").custom(async (value, { req }) => {
  const user = await db.query(
    // "SELECT usuarios.id, usuarios.usuario, usuarios.nomecompleto, cargos.descricao AS cargo, acesso.descricao AS acesso, tipocargos.id AS tipocargos_id, tipoacesso.id AS tipoacesso_id FROM usuarios, acesso, cargos, tipoacesso, tipocargos WHERE usuarios.usuario = $1 AND usuarios.ativo = true AND (tipoacesso.id_usr = usuarios.id AND acesso.id = tipoacesso.id_acesso) AND (tipocargos.id_usr = usuarios.id AND cargos.id = tipocargos.id_cargos)"
    "SELECT * FROM usuarios WHERE usuarios.usuario = $1",
    [value]
  );

  if (!user.rows.length) {
    throw new Error("Usuário não existe");
  }

  const validarSenha = await bcrypt.compare(req.body.senha, user.rows[0].senha);
  if (!validarSenha) {
    throw new Error("Senha inválida!");
  }

  req.user = user.rows[0];
});

module.exports = {
  validarRegistro: [
    validarCPF,
    cpfExiste,
    email,
    senha,
    usuario,
    nomecompleto,
    emailExists,
    usuarioExiste,
  ],
  validarLogin: [validarCamposLogin],
};
