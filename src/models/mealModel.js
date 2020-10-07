const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MealSchema = new Schema({
    name: String,
    taste: String,
    veggie: Boolean,
    restaurants: [{ type: Schema.Types.ObjectId, ref: "restaurants", autopopulate: true }]
},{ 
    timestamps: true
})


MealSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('meals', MealSchema) 