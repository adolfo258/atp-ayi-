const express = require("express");
const router = express.Router();
const multer = require("../config/multer");
const passport = require("passport");

const {
  showMeal,
  createMeal,
  editMeal,
  deleteMeal,
  searchMeal,
  createAvatar,
} = require("../controllers/mealController");
const { validateMeal } = require("../validators/mealValidator");

const { checkRoles } = require("../controllers/authController");

//SEARCH
router.get("/search/:params", passport.authenticate("jwt", { session: false }), searchMeal);

//GET
router.get("/", passport.authenticate("jwt", { session: false }), showMeal);

//POST
router.post("/", passport.authenticate("jwt", { session: false }), createMeal);

//IMG UPLOAD
router.post(
  "/uploads/:id",
  passport.authenticate("jwt", { session: false }),
  multer.single("avatar"),
  createAvatar
);

//PUT
router.put("/:id", passport.authenticate("jwt", { session: false }), editMeal);

//DELETE
router.delete("/", passport.authenticate("jwt", { session: false }), deleteMeal);
router.delete("/:id", passport.authenticate("jwt", { session: false }), deleteMeal);

module.exports = router;
