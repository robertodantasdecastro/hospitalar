const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { SECRET } = require("../constants");
const db = require("../db");

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

const opts = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtractor,
};

passport.use(
  new Strategy(opts, async ({ id }, done) => {
    try {
      const { rows } = await db.query(
        "SELECT * FROM usuarios WHERE usuarios.id = $1 AND usuarios.ativo = true",
        [id]
      );

      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      let user = {
        id: rows[0].id,
        usuario: rows[0].usuario,
        nomecompleto: rows[0].nomecompleto,
      };
      return await done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);
