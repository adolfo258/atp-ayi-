const MealSchema = require("../models/mealModel");

//SHOW
const showMeal = (req, res) => {
  if (!req.params.id) {
    MealSchema.find()
      .then(meals => res.send(meals))
      .catch(err => res.status(404).send(err));
  } else {
    MealSchema.find({ _id: req.params.id })
      .then(msg => res.send(msg))
      .catch(err => res.status(404).send(err));
  }
};

//CREATE
const createMeal = async (req, res) => {
  const meal = new MealSchema(req.body);

  meal
    .save()
    .then(msg => res.send("Meal inserted correctly"))
    .catch(err => res.status(500).send(err));
};

//EDIT
const editMeal = (req, res) => {
  MealSchema.update({ _id: req.params.id }, req.body)
    .then(msg => res.send(`Meal edited correctly`))
    .catch(err => res.status(500).send(err));
};

//DELETE
const deleteMeal = (req, res) => {
  if (!req.params.id) {
    MealSchema.remove()
      .then(meals => res.send("Collection MEALS deleted"))
      .catch(err => res.status(500).send(err));
  } else {
    MealSchema.remove({ _id: req.params.id })
      .then(msg => res.send(`Meal deleted`))
      .catch(err => res.status(500).send(err));
  }
};

module.exports = { showMeal, createMeal, editMeal, deleteMeal };
