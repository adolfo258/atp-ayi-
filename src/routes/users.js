const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const { showUser, createUser, editUser, deleteUser } = require('../controllers/userController')
const { validateUser } = require ('../validators/userValidator')

const { checkRoles } = require('../controllers/authController')

//GET
router.get('/', showUser)
router.get('/:id', showUser)

//POST
router.post('/register', createUser)
router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    //LE ENTREGO EL TOKEN AL USER AUTENTICADO
    const user = req.user

    const token = jwt.sign({ user }, process.env.SECRET, {expiresIn:'1h'})

    return res.json({ login:'Login succesfully', token })
})


//PUT
router.put('/:id' ,editUser)

//DELETE
router.delete('/' , deleteUser)
router.delete('/:id', deleteUser)


module.exports = router
