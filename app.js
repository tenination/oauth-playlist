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

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: keys.email.user,
    pass: keys.email.password
  }
});

var mailOptions = {
  from: keys.email.user,
  to: 'miachildrensbooks@gmail.com',
  subject: 'Sending Email using Node.js ilkl;ks kljkeasy',
  html: '<h1>Welcome</h1><p>That was not easy!</p><img '
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
