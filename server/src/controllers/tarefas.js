const db = require("../db");

exports.addTarefa = async (rec, res) => {
  const { id_logado, titulo, descricao, progresso } = req.body;

  try {
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.TodasTarefas = async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT tarefas.*, usuarios.id AS usr_id, usuarios.nomecompleto AS nomecompleto FROM tarefas, usuarios WHERE usuarios.id = tarefas.id_usr"
    );
    return res.status(200).json({
      tarefas: rows,
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

exports.UsrLogadoTarefas = async (req, res) => {
  let user = req.user;
  const { id } = user.id;
  conslole.log("id usuario: " + id);
  try {
    const { rows } = await db.query(
      "SELECT tarefas.*, usuarios.id AS usr_id, usuarios.nomecompleto AS nomecompleto FROM tarefas, usuarios WHERE tarefas.id_usr = $1",
      [id]
    );
    return res.status(200).json({
      tarefas: rows,
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

exports.FiltrarUsuarioTarefas = async (req, res) => {
  const { idUsr } = req.body;
  console.log("ID enviado: " + idUsr);
  try {
    const { rows } = await db.query(
      "SELECT tarefas.*, usuarios.id AS usr_id, usuarios.nomecompleto AS nomecompleto FROM tarefas, usuarios WHERE tarefas.id_usr = $1",
      [idUsr]
    );
    return res.status(200).json({
      users: rows,
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
