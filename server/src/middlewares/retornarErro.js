const { validationResult } = require('express-validator')

exports.validarCampos = (req, res, next) => {
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        })
    }
    next()
}
