var db = require('../models');
var path = require("path");
var userSession;

module.exports = function (app) {

  //////////////////////////////////////
  // HOMEPAGE HTML ROUTES

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
  // REGISTER HTML ROUTES

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
  // USERS HTML ROUTES

  // Users HTML GET route
  app.get('/users', function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      res.render('users');
    });
  });
  //////////////////////////////////////


  //////////////////////////////////////
  // LOGIN HTML ROUTES

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

  // Login HTML POST route
  app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
      db.User.findOne({
        where: {
          username: username,
          password: password
        }
      }).then(function (results) {
        if (results) {
          // A matching user record was found.
          req.session.userid = results.id;
          req.session.loggedin = true;
          req.session.username = username;
          res.redirect('/profile');
        } else {
          // No matching record was found.
          res.render('login', {
            msg: 'No matching user record was found. Please log in to view your profile:'
          });
        }
      });
    } else {
      response.send('Please enter Username and Password!');
      response.end();
    };
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


  //////////////////////////////////////
  // Books HTML GET route
  app.get("/books", function (req, res) {
    res.render('books');
  });
  //////////////////////////////////////


  //////////////////////////////////////
  // Logout 
  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.redirect('/');
    });
  });
  //////////////////////////////////////


};