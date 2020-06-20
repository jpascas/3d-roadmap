const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../keys/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); //refers to the id from mongoDB, not Google
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({googleID: profile.id });
      if(existingUser){
        //aready have this user
        if(!existingUser.signedIn){
          existingUser.signedIn = true;
          existingUser.save();
        }
        return done(null, existingUser);
      };
      //register the new user
      const user = await new User({
        googleID: profile.id,
        facebookID: null,
        active: true,
        signedIn: true,
        name: profile.displayName,
        email: profile.emails[0].value,
        car: {
          backEnd: {
            color: 'purple',
            position: [0,0,0]
          },
          frontEnd: {
            color: 'black',
            position: [0,0,0]
          }
        }
      }).save();
      done(null, user);
    }
  )
);