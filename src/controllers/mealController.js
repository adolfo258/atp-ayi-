const MealSchema = require("../models/mealModel");
const path = require("path");
const fs = require("fs-extra");

//SEARCH
const searchMeal = (req, res) => {
  MealSchema.find({ $text: { $search: req.params.params } })
    .then(rest => res.send(rest))
    .catch(err => res.json({ err }));
};

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
    .then(msg => res.json({ message: "Meal inserted correctly" }))
    .catch(err => res.status(500).json({ err }));
};

//EDIT
const editMeal = (req, res) => {
  MealSchema.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(msg => res.json({ message: `Meal edited correctly` }))
    .catch(err => res.status(500).json({ err }));
};

//IMG UPLOAD
const createAvatar = (req, res) => {
  const pathAvatar = req.file.path;

  MealSchema.findOneAndUpdate({ _id: req.params.id }, { avatar: pathAvatar })
    .then(meal => {
      //si hay una foto previamente la borro
      if (meal.avatar) {
        fs.unlink(path.resolve(meal.avatar));
      }
      return res.json({ message: "Avatar updated correctly" });
    })
    .catch(err => res.json({ err }));
};

//DELETE
const deleteMeal = (req, res) => {
  if (!req.params.id) {
    MealSchema.remove()
      .then(meals => res.json({ message: "Collection MEALS deleted" }))
      .catch(err => res.status(500).send(err));
  } else {
    MealSchema.remove({ _id: req.params.id })
      .then(msg => res.json({ message: `Meal deleted` }))
      .catch(err => res.status(500).send(err));
  }
};

module.exports = { showMeal, createMeal, editMeal, deleteMeal, searchMeal, createAvatar };
