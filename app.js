const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const Twitter = require('twitter');
const nodemailer = require('nodemailer');

const app = express();

// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

// const client = new Twitter({
//   consumer_key: 'Y61TAiKhk8y7n6rroloFzMCcN',
//   consumer_secret: 'U9gDRaWA0IMf4BcGlkxoGJegDnCeAOa2MZtfNeHnipDABWeQsA',
//   access_token_key: '887772313512529921-NN3EEixoK6eOTCrtFfbyNCxkjNiXYDj',
//   access_token_secret: '10Qv0n2zXIQa6YFv4KrJcwYLDz60XWQBIgyT6OQZXDrQN'
// });

const client = new Twitter({
  consumer_key: 'Y61TAiKhk8y7n6rroloFzMCcN',
  consumer_secret: 'U9gDRaWA0IMf4BcGlkxoGJegDnCeAOa2MZtfNeHnipDABWeQsA',
  access_token_key: '951844182599061507-0eTWGOqkF93lSTGr5WKK7vM5sn3mD7a',
  access_token_secret: '4osbYKRWF4v8FBAGvTDU7gDHBJoDSA71QctQjOjCZEFlw'
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'theodore.pinkett@gmail.com',
    pass: 'bobby1905'
  }
});

var mailOptions = {
  from: 'theodore.pinkett@gmail.com',
  to: 'miachildrensbooks@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});
