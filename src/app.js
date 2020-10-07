//ENV VARIABLES

require('dotenv').config()

//EXPRESS

const express = require('express')
const app = express()

//DATABASE

require('./config/mongodb')

//SETTINGS

app.set('port', process.env.PORT)

//SERVER

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})

//PASSPORT

const passport = require('passport')
require('./config/passport')

//MIDLEWARES

app.use(express.json())

//ROUTER IMPORT

const userRouter = require('./routes/users')
const restaurantRouter = require('./routes/restaurants')
const mealRouter = require('./routes/meals')



app.use('/user', userRouter)
app.use('/restaurant', restaurantRouter)
app.use('/meal', passport.authenticate('jwt', {session:false}), mealRouter)


//404 Not Found
app.use((req, res) => {
    res.status(404).send('Sorry cant find that!');
  });