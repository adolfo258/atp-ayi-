//ENV VARIABLES

require('dotenv').config()

//EXPRESS

const express = require('express')
const app = express()

//DATABASE

require('./config/mongodb')

//SETTINGS
const cors = require('cors')


app.set('port', process.env.PORT)
app.use(express.json())
app.use(cors())

//SERVER

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})

//PASSPORT

const passport = require('passport')
require('./config/passport')


//ROUTER IMPORT

const userRouter = require('./routes/users')
const restaurantRouter = require('./routes/restaurants')
const mealRouter = require('./routes/meals')


app.use('/user', userRouter)
app.use('/restaurant', restaurantRouter)
app.use('/meal' ,mealRouter)


//404 NOT FOUND
app.use((req, res) => {
    res.status(404).send('Sorry cant find that!');
  });