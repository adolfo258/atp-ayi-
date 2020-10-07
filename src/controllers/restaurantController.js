const RestaurantSchema = require('../models/restaurantModel')


//SHOW
    const showRestaurant = (req, res) => {
        if(!req.params.id){
            RestaurantSchema.find().then(restaurants => res.send(restaurants)).catch(err => res.status(404).send(err))
            
        }else{
            RestaurantSchema.find({_id : req.params.id}).then(msg => res.send(msg)).catch(err => res.status(404).send(err))
            
        }
    }

//CREATE
    const createRestaurant = async(req, res) => {
        const restaurant = new RestaurantSchema(req.body)

        restaurant.save().then(msg => res.send('Restaurant inserted correctly')).catch(err => res.status(500).send(err))

    }

//EDIT
    const editRestaurant = (req, res) => {
        RestaurantSchema.update({_id : req.params.id}, req.body).then(msg => res.send(`Restaurant edited correctly`)).catch(err => res.status(500).send(err))
    
    }
    
//DELETE
    const deleteRestaurant = (req, res) => {
            if(!req.params.id){
            RestaurantSchema.remove().then(restaurants => res.send('Collection Restaurants deleted')).catch(err => res.status(500).send(err))

            }else{
            RestaurantSchema.remove({_id : req.params.id}).then(msg => res.send(`Restaurant deleted`)).catch(err => res.status(500).send(err))

            }
        }


module.exports = {showRestaurant, createRestaurant, editRestaurant, deleteRestaurant }