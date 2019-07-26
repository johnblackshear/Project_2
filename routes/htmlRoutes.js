var db = require('../models');
var path = require("path");
var userSession;

module.exports = function (app) {

  //////////////////////////////////////
  // Homepage HTMLGET route
  app.get('/', function (req, res) {
    // If the user is logged in
    if (req.session.loggedin) {
      userSession = req.session;
      userSessionName = JSON.stringify(userSession.username);
      res.render('index', {
        msg: 'Welcome ' + userSessionName
      });
    } else {
      // User is not logged in
      res.render('index', {
        msg: 'Welcome to our book club app!'
      });
    }
  });
  //////////////////////////////////////


  //////////////////////////////////////
  // Register User HTML GET route
  app.get('/register', function (req, res) {
    // If the user is logged in
    if (req.session.loggedin) {
      res.redirect('/profile');
    } else {
      // User is not logged in
      res.render('register');
    }
  });
  //////////////////////////////////////


  //////////////////////////////////////
  // Users HTML GET route
  app.get('/users', function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      res.render('users');
    });
  });
  //////////////////////////////////////


  //////////////////////////////////////
  // Login HTML GET route
  app.get("/login", function (req, res) {
    // If the user is logged in
    if (req.session.loggedin) {
      res.redirect('/profile');
    } else {
      // User is not logged in
      res.render('login');
    }
  });
  //////////////////////////////////////


  //////////////////////////////////////
  // Profile HTML GET route
  app.get('/profile', function (req, res) {
    // If the user is logged in
    if (req.session.loggedin) {
      userSession = req.session;
      userSessionName = JSON.stringify(userSession.username);
      db.User.findOne({
        where: {
          id: userSession.userid
        }
      }).then(function (userResult) {
        var renderUsername = JSON.stringify(userResult.username);
        renderUsername = renderUsername.replace(/^"(.+(?="$))"$/, '$1');
        var renderEmail = JSON.stringify(userResult.email);
        renderEmail = renderEmail.replace(/^"(.+(?="$))"$/, '$1');
        res.render('profile', {
          loginstatus: 'You are logged in, ' + userSessionName,
          username: renderUsername,
          email: renderEmail
        });
      });
    } else {
      // User is not logged in
      res.render('login', {
        msg: 'You are not logged in. Please log in to view your profile:'
      });
    }
  });
  //////////////////////////////////////





};