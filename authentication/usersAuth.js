const userAuth = (req, res, next) => {
  if (req.session.userAuth) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = userAuth;
