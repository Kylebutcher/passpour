// This is the session authenticator for the user being logged in at the site. We use the authenticator to terminate sessions on a log out button. 


const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
}

module.exports = withAuth