const db = require("../db");
//const jwt =  require("jsonwebtoken");
//const { hash } = require("bcryptjs");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.VerUsuarios = async (req, res) => {
  let user = req.user;
  try {
    // "SELECT usuarios.*, cargos.descricao AS usr_cargo, acesso.descricao AS usr_tipo, tipocargo.id AS cargo_id, tipoacesso.id as acesso_id FROM usuarios, acesso, cargos, tipoacesso, tipocargos WHERE (tipoacesso.id_usr = usuarios.id AND acessos.id = tipoacesso.id_acesso) AND (tipocargo.id_usr = usuarios.id AND cargos.id = tipocargos.id_cargos)"
    // "SELECT usuarios.* FROM usuarios ORDER BY usuarios.nomecompleto ASC"

    //"SELECT usuarios.id, usuarios.usuario, usuarios.nomecompleto, tipocargos.descricao AS cargos, tipoacesso.descricao AS acesso FROM usuarios, acesso, cargos, tipoacesso, tipocargos WHERE usuarios.ativo = true AND (tipoacesso.id_usr = usuarios.id AND acesso.id = tipoacesso.id_acesso) AND (tipocargos.id_usr = usuarios.id AND cargos.id = tipocargos.id_cargos)"
    const { rows } = await db.query(
      "SELECT usuarios.id, usuarios.usuario, usuarios.nomecompleto, cargos.descricao AS cargo, acesso.descricao AS acesso FROM usuarios, acesso, cargos, tipoacesso, tipocargos WHERE usuarios.ativo = true AND (tipoacesso.id_usr = usuarios.id AND acesso.id = tipoacesso.id_acesso) AND (tipocargos.id_usr = usuarios.id AND cargos.id = tipocargos.id_cargos) ORDER BY usuarios.nomecompleto ASC"
    );
    // console.log(rows)
    return res.status(200).json({
      usuarios: rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.VerCargos = async (req, res) => {
  //  let user = req.user;
  try {
    const { rows } = await db.query("SELECT * FROM cargos");
    return res.status(200).json({
      cargos: rows,
    });
    //  console.log(rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.acesso = async (req, res) => {
  //  let user = req.user;
  try {
    const { rows } = await db.query("SELECT * FROM acesso");
    return res.status(200).json({
      acesso: rows,
    });
    // console.log(rows)
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.tipoAcesso = async (req, res) => {
  const { id_usr } = req.body;
  try {
    const { rows } = await db.query(
      "SELECT * FROM tipoacesso WHERE id_usr = $1",
      [id_usr]
    );
    return res.status(200).json({
      cargos: rows,
    });
    // console.log(rows)
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.addUser = async (req, res) => {
  const {
    usuario,
    nomecompleto,
    CPF,
    identidade,
    senha,
    ativo,
    nascimento,
    email,
    celular,
    telfixo,
    CEP,
    UF,
    cidade,
    bairro,
    logradouro,
    numero,
    complemento,
    referencia,
    cargo,
    tipoacesso,
  } = req.body;
  try {
    //const hashedPassword = await hash(senha, 10);

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(senha, salt);

    await db.query(
      "INSERT INTO usuarios(usuario, nomecompleto, cpf, identidade, senha, ativo, nascimento) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        usuario,
        nomecompleto,
        CPF,
        identidade,
        bcryptPassword,
        ativo,
        nascimento,
      ]
    );

    let { rows } = await db.query(
      "SELECT usuarios.id FROM usuarios WHERE usuarios.cpf = $1",
      [CPF]
    );

    const id_us = rows[0].id;

    await db.query(
      "INSERT INTO contatosusr(id_usr, email, celular, telfixo) VALUES ($1, $2, $3, $4)",
      [id_us, email, celular, telfixo]
    );
    await db.query(
      "INSERT INTO enderecosusr(id_usr, cep, uf, cidade, logradouro, bairro, numero, complemento, referencias) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        id_us,
        CEP,
        UF,
        cidade,
        logradouro,
        bairro,
        numero,
        complemento,
        referencia,
      ]
    );
    await db.query(
      "INSERT INTO tipocargos(id_usr, id_cargos) VALUES ($1, $2)",
      [id_us, cargo]
    );
    await db.query(
      "INSERT INTO tipoacesso(id_usr, id_acesso) VALUES ($1, $2)",
      [id_us, tipoacesso]
    );

    return res.status(201).json({
      success: true,
      // idUSR: id_us,
      message: "Usuário adicionado com sucesso!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.id_usr_logado = async (req, res) => {
  let user = req.user;
  let { id } = user;
  try {
    console.log("id_usr=> " + id);
    return res.status(200).json({
      id: id,
      nomeusuario: user.usuario,
      nomecompleto: user.nomecompleto,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.USRlogado = async (req, res) => {
  let user = req.user;
  try {
    console.log("id: " + user.id);
    console.log("user: " + user.usuario);
    return res.status(200).json({
      id: user.id,
      usuario: user.usuario,
      nome: user.nomecompleto,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  let user = req.user;
  payload = {
    id: user.id,
    usuario: user.usuario,
  };
  try {
    const token = await sign(payload, SECRET);
    return res
      .status(200)
      .cookie("token", token, { maxAge: 90000000, httpOnly: true })
      .json({
        success: true,
        message: "Login realizado com sucesso!",
        usuario: user.usuario,
        NomeCompleto: user.nomecompleto,
      });
  } catch (error) {
    return res.status(500).clearCookie("token", { httpOnly: true }).json({
      success: false,
      message: "Logout realizado!",
      error: error.message,
    });
  }
};

exports.logout = async (rec, res) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logout realizado com sucesso!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
