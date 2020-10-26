const Joi = require("joi");

const validateMeal = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    taste: Joi.string().required(),
    veggie: Joi.boolean().required(),
    restaurants: Joi.array(),
  });

  schema
    .validateAsync(req.body)
    .then((msg) => next())
    .catch((err) => res.status(400).send(err.details[0].message));
};

module.exports = { validateMeal };
