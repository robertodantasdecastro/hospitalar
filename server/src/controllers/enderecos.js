const db = require("../db");

exports.CEP = async (req, res) => {
  let { cep } = req.body;

  try {
    cep = cep.toString().replace("-", "").replace(/-/, "").replace(".", "");
    //  console.log("CEP --> " + cep);
    const { rows } = await db.query(
      "SELECT * FROM logradouro WHERE logradouro.cep = $1",
      [cep]
    );
    //  console.log("Linhas: "+rows);
    return res.status(200).json({
      enderecoCEP: rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.UF = async (req, res) => {
  //  let user = req.user;
  try {
    const { rows } = await db.query("SELECT * FROM uf ORDER BY sigla ASC");
    return res.status(200).json({
      UF: rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.cidades = async (req, res) => {
  let { uf } = req.body;
  //console.log("UF =-> " + uf);
  try {
    const { rows } = await db.query(
      "SELECT DISTINCT id_cidade, descricao_cidade, codigo_cidade_ibge FROM logradouro WHERE logradouro.uf = $1 ORDER BY descricao_cidade ASC",
      [uf]
    );
    //console.log("Linhas: "+rows);
    return res.status(200).json({
      Cidades: rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.bairros = async (req, res) => {
  let { id_cid } = req.body;
  //  console.log("id_cid =-> " + id_cid);
  try {
    const { rows } = await db.query(
      "SELECT DISTINCT descricao_bairro FROM logradouro WHERE logradouro.id_cidade = $1 ORDER BY descricao_bairro ASC",
      [id_cid]
    );
    //console.log("Linhas: "+rows);
    return res.status(200).json({
      Bairros: rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.tipoEndereco = async (req, res) => {
  //  let user = req.user;
  try {
    const { rows } = await db.query(
      "SELECT * FROM tipoendereco ORDER BY tipoendereco ASC"
    );
    return res.status(200).json({
      tipoEndereco: rows,
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

exports.logradouro = async (req, res) => {
  const { id_cid, bairro } = req.body;
  // console.log("id_cidade_logradouro = " + id_cid);
  try {
    const { rows } = await db.query(
      "SELECT DISTINCT descricao_sem_numero, id_logradouro FROM logradouro WHERE logradouro.id_cidade = $1 AND logradouro.descricao_bairro = $2 ORDER BY logradouro.descricao_sem_numero ASC",
      [id_cid, bairro]
    );
    return res.status(200).json({
      Logradouro: rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.decobrirCEPsemBairro = async (req, res) => {
  const { uf, id_cid, bairro } = req.body;
  console.log(" uf = " + uf + " id_cid = " + id_cid + " bairro: " + bairro);
  try {
    const { rows } = await db.query(
      "SELECT DISTINCT cep FROM logradouro WHERE logradouro.uf = $1 AND logradouro.id_cidade = $2 AND logradouro.descricao_bairro = $3 ORDER BY logradouro.cep ASC",
      [uf, id_cid, bairro]
    );

    return res.status(200).json({
      CEP: rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "erro retornado",
      success: false,
      error: error.message,
    });
  }
};

exports.decobrirCEP = async (req, res) => {
  const { uf, id_cid, bairro, logradouro } = req.body;
  /*  console.log(
    " uf = " +
      uf +
      " id_cid = " +
      id_cid +
      " bairro = " +
      bairro +
      " Logradouro = " +
      logradouro
  ); */
  try {
    const { rows } = await db.query(
      "SELECT DISTINCT cep FROM logradouro WHERE logradouro.id_cidade = $1 AND logradouro.descricao_bairro = $2 AND logradouro.uf = $3 and logradouro.descricao_sem_numero = $4 ORDER BY logradouro.cep ASC",
      [id_cid, bairro, uf, logradouro]
    );

    return res.status(200).json({
      CEP: rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
