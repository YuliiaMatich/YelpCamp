const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('users/register');
})

router.post('/register', catchAsync(async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, function(err) { // passport
      if (err) {
        return next(err);
      } 
      req.flash('success', 'Welcome to YelpCamp');
      res.redirect('/campgrounds');
    });

  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
}));


router.get('/login', (req, res) => {
  console.log('get', req.session)
  res.render('users/login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
  console.log('post', req.session);
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'you has been logged out');
    res.redirect('/campgrounds');
  })
});

module.exports = router;