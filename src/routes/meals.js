const express = require("express");
const router = express.Router();

const { showMeal, createMeal, editMeal, deleteMeal } = require("../controllers/mealController");
const { validateMeal } = require("../validators/mealValidator");

const { checkRoles } = require("../controllers/authController");

//GET
router.get("/", showMeal);
router.get("/:id", showMeal);

//POST
router.post("/", validateMeal, createMeal);

//PUT
router.put("/:id", editMeal);

//DELETE
router.delete("/", deleteMeal);
router.delete("/:id", deleteMeal);

module.exports = router;
