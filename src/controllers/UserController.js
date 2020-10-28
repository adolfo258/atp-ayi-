const UserSchema = require("../models/userModel");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs-extra");

//SEARCH
const searchUser = (req, res) => {
  UserSchema.find({ $text: { $search: req.params.params } })
    .then(users => res.json({ users }))
    .catch(err => res.json({ err }));
};

//SHOW
const showUser = (req, res) => {
  if (!req.params.id) {
    UserSchema.find()
      .then(users => res.send(users))
      .catch(err => res.status(404).send(err));
  } else {
    const id = req.params.id;
    UserSchema.findById(id)
      .then(user => res.send(user))
      .catch(err => res.status(404).send(err));
  }
};

const showManagerUsers = async (req, res) => {
  UserSchema.find({ rol: "restaurant_manager" })
    .then(users => res.json({ users }))
    .catch(err => res.status(500).json({ err }));
};

//CREATE
const createUser = async (req, res) => {
  const user = new UserSchema(req.body);

  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    user
      .save()
      .then(user => res.json({ message: "Usuario creado correctamente" }))
      .catch(err => res.status(500).send(err));
  } catch (e) {
    res.status(500).send("Error al crear usuario");
  }
};

//EDIT
const editUser = async (req, res) => {
  const user = req.body;

  UserSchema.findByIdAndUpdate({ _id: req.params.id }, user)
    .then(msg => res.json({ message: `User edited correctly` }))
    .catch(err => res.status(500).send(err));
};

//IMG UPLOAD
const createAvatar = (req, res) => {
  const pathAvatar = req.file.path;

  UserSchema.findOneAndUpdate({ _id: req.params.id }, { avatar: pathAvatar })
    .then(user => {
      //si hay una foto previamente la borro
      if (user.avatar) {
        fs.unlink(path.resolve(user.avatar));
      }
      return res.json({ message: "Avatar updated correctly" });
    })
    .catch(err => res.json({ err }));
};

//DELETE
const deleteUser = (req, res) => {
  if (!req.params.id) {
    UserSchema.remove()
      .then(users => res.json({ message: "Collection USERS deleted" }))
      .catch(err => res.status(500).send(err));
  } else {
    UserSchema.remove({ _id: req.params.id })
      .then(user => res.json({ message: `User deleted` }))
      .catch(err => res.status(500).send(err));
  }
};

module.exports = {
  showUser,
  createUser,
  editUser,
  deleteUser,
  createAvatar,
  searchUser,
  showManagerUsers,
};
