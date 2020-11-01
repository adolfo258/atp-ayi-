const RestaurantSchema = require("../models/restaurantModel");
const path = require("path");
const fs = require("fs-extra");

//SEARCH
const searchRestaurant = (req, res) => {
  RestaurantSchema.find({ $text: { $search: req.params.params } })
    .then(rest => res.send(rest))
    .catch(err => res.send(err));
};

//SHOW
const showRestaurant = (req, res) => {
  if (!req.params.id) {
    RestaurantSchema.find()
      .populate()
      .then(restaurants => res.send(restaurants))
      .catch(err => res.status(404).send(err));
  } else {
    RestaurantSchema.find({ _id: req.params.id })
      .then(msg => res.send(msg))
      .catch(err => res.status(404).send(err));
  }
};

//CREATE
const createRestaurant = async (req, res) => {
  const restaurant = new RestaurantSchema(req.body);

  restaurant
    .save()
    .then(msg => res.json({ message: "Restaurant inserted correctly" }))
    .catch(err => res.status(500).send(err));
};

//EDIT
const editRestaurant = (req, res) => {
  RestaurantSchema.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(msg => res.send(msg))
    .catch(err => res.status(500).json({ err }));
};

const pushMeal = (req, res) => {
  RestaurantSchema.findByIdAndUpdate({ _id: req.params.id }, { $push: { meals: req.body.meals } })
    .then(restaurant => res.send(restaurant))
    .catch(err => res.status(500).json({ err }));
};

const removeMealFromRestaurant = (req, res) => {
  RestaurantSchema.findByIdAndUpdate({ _id: req.params.id }, { $pull: { meals: req.body.mealId } })
    .then(rest => res.send(rest))
    .catch(err => res.status(500).json({ err }));
};

//IMG UPLOAD
const createAvatar = (req, res) => {
  const pathAvatar = req.file.path;

  RestaurantSchema.findOneAndUpdate({ _id: req.params.id }, { avatar: pathAvatar })
    .then(restaurant => {
      //si hay una foto previamente la borro
      if (restaurant.avatar) {
        fs.unlink(path.resolve(restaurant.avatar));
      }
      return res.json({ message: "Avatar updated correctly" });
    })
    .catch(err => res.json({ err }));
};

//DELETE
const deleteRestaurant = (req, res) => {
  if (!req.params.id) {
    RestaurantSchema.remove()
      .then(restaurants => res.json({ message: "Collection Restaurants deleted" }))
      .catch(err => res.status(500).json({ err }));
  } else {
    RestaurantSchema.remove({ _id: req.params.id })
      .then(msg => res.json({ message: `Restaurant deleted` }))
      .catch(err => res.status(500).json({ err }));
  }
};

module.exports = {
  showRestaurant,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
  searchRestaurant,
  createAvatar,
  pushMeal,
  removeMealFromRestaurant,
};
