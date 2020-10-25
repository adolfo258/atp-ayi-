const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
    name: String,
    smoke: String,
    lat: String,
    long: String,
    cuit: String,
    meals: [{ type: Schema.Types.ObjectId, ref: "meals", autopopulate: true }]
},{
    timestamps: true
})

RestaurantSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('restaurants', RestaurantSchema) 