const Joi = require("joi");

const validateRestaurant = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    smoke: Joi.string().required(),
    lat: Joi.string().required(),
    long: Joi.string().required(),
    cuit: Joi.string().min(12).max(13).required(),
    meals: Joi.array().allow("").optional(),
    avatar: Joi.string().allow("").optional(),
  });

  schema
    .validateAsync(req.body)
    .then(msg => next())
    .catch(err => res.status(400).send(err.details[0].message));
};

module.exports = { validateRestaurant };
