const express = require("express");
const router = express.Router();
const multer = require("../config/multer");
const passport = require("passport");

const {
  showRestaurant,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
  searchRestaurant,
  createAvatar,
  pushMeal,
  removeMealFromRestaurant,
} = require("../controllers/restaurantController");

const { validateRestaurant } = require("../validators/restaurantValidator");

const { checkRoles } = require("../controllers/authController");

//SEARCH
router.get("/search/:params", passport.authenticate("jwt", { session: false }), searchRestaurant);

//GET
router.get("/", passport.authenticate("jwt", { session: false }), showRestaurant);

//POST
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin"]),
  createRestaurant
);

//IMG UPLOAD
router.post(
  "/uploads/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin", "restaurant_manager"]),
  multer.single("avatar"),
  createAvatar
);

//PUT
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin", "restaurant_manager"]),
  editRestaurant
);
router.put(
  "/addmeal/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin", "restaurant_manager"]),
  pushMeal
);
router.put(
  "/removemeal/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin", "restaurant_manager"]),
  removeMealFromRestaurant
);

//DELETE
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin"]),
  deleteRestaurant
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["admin", "restaurant_manager"]),
  deleteRestaurant
);

module.exports = router;
