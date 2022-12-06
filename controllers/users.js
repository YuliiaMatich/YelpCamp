const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
  res.render('users/register');
};

module.exports.register = async (req, res, next) => {
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
};

module.exports.renderLogin = (req, res) => {
  console.log('get', req.session)
  res.render('users/login');
};

module.exports.login = (req, res) => {
  console.log('post', req.session);
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'you has been logged out');
    res.redirect('/campgrounds');
  })
};