const passport = require('passport')
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const UserSchema = require('../models/userModel')
const JwtStrategy = require('passport-jwt').Strategy
const bcrypt = require('bcrypt')

//LOCAL STRATEGY PARA LOGEAR
passport.use( new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'

}, (email, password, done) => {
    UserSchema.findOne({email}, async(err, user) => {
        if(err) { return done(err) }

        if(!user) { return done(null, false, {message: 'Email dont exist'}) }
        else{
            const passwordIsValid = await bcrypt.compare(password, user.password)

            if(!passwordIsValid){ return done(null, false, {message:'Incorrect password'}) }

            else{ return done(null, user, {message: 'Login succesfully'}) }
        }
    })
}))


//JWT STRATEGY PARA AUTENTICAR EL TOKEN EN CADA RUTA
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('auth-token'),
    secretOrKey: process.env.SECRET

}, (jwt_payload, done) => {
    UserSchema.findOne({id: jwt_payload.sub}, (err, user) => {
        
        if(err){ return done (err, false) }

          if(user){ return done(null,user) }

          else{ return done(null,false) }
    })
}))