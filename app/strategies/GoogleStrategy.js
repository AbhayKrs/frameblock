import passport from 'passport';
import googlestrategy from 'passport-google-oauth2';
import User from '../models/user_model.js';
import bcrypt from 'bcryptjs';

const GoogleStrategy = googlestrategy.Strategy;

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/v1/users/googleAuth/callback",
        passReqToCallback: true,
        proxy: true
    }, async (request, accessToken, refreshToken, profile, done) => {
        //Check user table for anyone with the Google ID
        await User.findOne({ email: profile.email }).then((user, err) => {
            if (!user) {
                const newUser = new User({
                    google_id: profile.id,
                    google_authenticated: true,
                    name: profile.displayName,
                    email: profile.email,
                    username: profile.email.substring(0, profile.email.indexOf("@")),
                    password: 'test12',
                    created_on: new Date(),
                    last_login: new Date()
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save().then(res => {
                            return done(null, profile);
                        });
                    })
                })
            } else {
                if (user.google_authenticated === false) {
                    user.google_id = profile.id;
                    user.google_authenticated = true;
                    user.last_login = new Date();
                    user.save().then(res => {
                        return done(null, profile);
                    });
                } else {
                    user.last_login = new Date();
                    user.save();
                    return done(err, profile);
                }
            }
        })
    })
)