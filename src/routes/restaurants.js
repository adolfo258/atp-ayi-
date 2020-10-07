const express = require('express')
const router = express.Router()

const {showRestaurant, createRestaurant, editRestaurant, deleteRestaurant } = require('../controllers/restaurantController')
const {validateRestaurant} = require ('../validators/restaurantValidator')

const { checkRoles } = require('../controllers/authController')

//GET
router.get('/', showRestaurant)
router.get('/:id', showRestaurant)

//POST
router.post('/',validateRestaurant, createRestaurant)

//PUT
router.put('/:id', editRestaurant)

//DELETE
router.delete('/', deleteRestaurant)
router.delete('/:id', deleteRestaurant)


module.exports = router