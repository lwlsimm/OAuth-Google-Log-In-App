const router = require('express').Router();
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login', {user: req.user});
});

//Log out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


//Google
router.get('/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/redirect', passport.authenticate('google', {failureRedirect: '/google'}),(req, res) => {
  res.redirect('/profile')
})

module.exports = router;