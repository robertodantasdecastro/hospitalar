const db = require("../db");

exports.expSegura = async (req, res) => {
  //let user = req.user;
  try {
    const { rows } = await db.query(
      "SELECT usuario, email, nomecompleto FROM usuarios"
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


