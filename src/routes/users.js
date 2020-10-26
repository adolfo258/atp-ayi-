const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("../config/multer");

const {
  showUser,
  createUser,
  editUser,
  deleteUser,
  createAvatar,
  searchUser,
} = require("../controllers/userController");

const { validateUser } = require("../validators/userValidator");

const { checkRoles, tokenCreate } = require("../controllers/authController");

//SEARCH
router.get("/:params", passport.authenticate("jwt", { session: false }), searchUser);

//GET
router.get("/", passport.authenticate("jwt", { session: false }), showUser);

//POST
router.post("/register", validateUser, createUser);
router.post("/login", passport.authenticate("local", { session: false }), tokenCreate);

//IMG UPLOAD
router.post(
  "/uploads/:id",
  passport.authenticate("jwt", { session: false }),
  multer.single("avatar"),
  createAvatar
);

//PUT
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin"]),
  editUser
);

//DELETE
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin"]),
  deleteUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin"]),
  deleteUser
);

module.exports = router;
