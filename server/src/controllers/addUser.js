const db = require("../db");
const bcrypt = require("bcrypt");

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
  } = req.body;
  try {
    const { verUsuario } = await db.query(
      "SELECT * FROM usuarios WHERE usuarios.usuario = $1",
      [usuario]
    );
    if (json({ verUsuario })) {
      return res.status(200).json({
        success: false,
        nome_de_usuario_existente: verUsuario,
      });
    }

    const { verCPF } = await db.query(
      "SELECT usuarios.cpf FROM usuarios WHERE usuarios.cpf = $1",
      [CPF]
    );
    if (json({ verCPF })) {
      return res.status(200).json({
        success: false,
        CPF_de_usuario_existente: verCPF,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    await db.query(
      "INSERT INTO usuarios(usuario, nomecompleto, cpf, identidade, senha, ativo, nascimento) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        usuario,
        nomecompleto,
        CPF,
        identidade,
        hashedPassword,
        ativo,
        nascimento,
      ]
    );

    const { verIDusr } = await db.query(
      "SELECT usuarios.id FROM usuarios WHERE usuarios.cpf = $1",
      [CPF]
    );

    if (json({ verIDusr })) {
      const id_usr = verIDusr.id;
      await db.query(
        "INSERT INTO contatosurs(id_usr, email, celular, telfixo) VALUES ($1, $2, $3, $4)",
        [id_usr, email, celular, telfixo]
      );
    }

    console.log("ID Usuario add: " + json({ verIDusr }));

    return res.status(201).json({
      success: true,
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
