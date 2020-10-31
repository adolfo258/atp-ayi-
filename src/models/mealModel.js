const { string } = require("joi");
const mongoose = require("mongoose");
const { schema } = require("./userModel");
const Schema = mongoose.Schema;

const MealSchema = new Schema(
  {
    name: String,
    taste: String,
    origin: String,
    veggie: String,
    avatar: String,
    restaurants: [{ type: Schema.Types.ObjectId, ref: "restaurants", autopopulate: true }],
    manager: { type: Schema.Types.ObjectId, ref: "users", autopopulate: true },
  },
  {
    timestamps: true,
  }
);

MealSchema.index({
  name: "text",
  taste: "text",
  origin: "text",
  restaurant: "text",
});

MealSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("meals", MealSchema);
