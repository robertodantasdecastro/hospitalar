const passport = require('passport')

exports.proteger = passport.authenticate('jwt', { session:false })
