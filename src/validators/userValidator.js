const Joi = require('joi')

const validateUser = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        dni: Joi.string().min(7).max(8).required(),
        fec_nac: Joi.string().required(),
        sex: Joi.string().required(),
        password: Joi.string().min(5).max(30).required(),
        email: Joi.string().email().required(),
        rol: Joi.any()
    })

    schema.validateAsync(req.body).then(msg => next()).catch(err => res.status(400).send(err.details[0].message))
}

module.exports = { validateUser }