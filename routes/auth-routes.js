const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// auth with twitter
router.get('/twitter', passport.authenticate('twitter'));

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

//auth with spotify
router.get('/spotify', passport.authenticate('spotify', {
     scope: ['user-read-email', 'user-read-private']
}));

//auth with github
router.get('/github', passport.authenticate('github'));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});

router.get('/twitter/redirect', passport.authenticate('twitter'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});

router.get('/spotify/redirect', passport.authenticate('spotify'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});

module.exports = router;
