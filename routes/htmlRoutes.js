var db = require('../models');
var path = require("path");
var userSession;

module.exports = function (app) {

  //////////////////////////////////////
  // Home page GET route
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





};