var db = require('../models');
var path = require("path");
var userSession;

module.exports = function (app) {

  // Home page GET route
  app.get('/', function (req, res) {
    // If the user is logged in
    if (req.session.loggedin) {
      userSession = req.session;
      userSessionName = JSON.stringify(userSession.username);
      res.render('index', {
        msg: 'Welcome!',
        loginstatus: 'You are logged in, ' + userSessionName,
        session: userSessionName
      });
    } else {
      // User is not logged in
      res.render('index', {
        msg: 'Welcome to Perusal, a book club app',
        loginstatus: 'You are NOT logged in'
      });
    }
  });


  // Register User page GET route
  app.get('/register', function (req, res) {
    // If the user is logged in
    if (req.session.loggedin) {
      res.redirect('/profile');
    } else {
      // User is not logged in
      db.Example.findAll({}).then(function (dbExample) {
        res.render('register', {
          example: dbExample
        });
      });
    }
  });


  // Login GET route
  app.get("/login", function (req, res) {
    // If the user is logged in
    if (req.session.loggedin) {
      res.redirect('/profile');
    } else {
      // User is not logged in
      res.render('login');
    }
  });


  // Login POST route
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
          req.session.userid = results.id;
          req.session.loggedin = true;
          req.session.username = username;
          console.log("found user");
          res.redirect('/profile');
        } else {
          // No matching record was found.
          console.log("no")
          res.send('No matching user record was found.' + 'Please login to view this page! <br>' + '<a href=/login>login</a><br><a href=/register>register</a>');
        }
      });
    } else {
      response.send('Please enter Username and Password!');
      response.end();
    };
  });


  // Profile page GET route
  app.get('/profile', function (req, res) {
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
      // res.redirect('/login');
      res.render('login', {
        msg: 'You are not logged in. Please log in to view your profile:'
      });
    }
  });


  // Clubs page GET route
  app.get('/clubs', function (req, res) {
    if (req.session.loggedin) {
      db.Club.findAll({}).then(function (dbClubs) {
        res.render('clubs', {
          clubname: dbClubs,
          addclub: '<a href=/addclub id=add-club>Add a Club</a>'
        });
      });
    } else {
      db.Club.findAll({}).then(function (dbClubs) {
        res.render('clubs', {
          clubname: dbClubs,
          addclub: ''
        });
      });
    };
  });





  // Add Club page GET route
  app.get('/addclub', function (req, res) {
    // If the user is logged in
    if (req.session.loggedin) {
      console.log("req.session: ", req.session);
      console.log("USERID: ", req.session.userid);
      var userid = req.session.userid;
      var username = req.session.username;
      db.Club.findAll({}).then(function (newclubinfo) {
        res.render('addclub', {
          userid: userid,
          username: username
        });
      });
    } else {
      // User is not logged in
      res.render('login', {
        msg: 'You are not logged in. Please log in to create a club:'
      });
    }
  });


  // Load clubs page and pass in a club by id
  app.get("/clubs/:id", function (req, res) {
    var clubId = req.params.id;
    if (req.session.loggedin) {
      var userId = req.session.userid;
      console.log("userid", userId);
      console.log("clubId:", clubId);
      db.Club.findOne({ where: { id: clubId } }).then(function (dbClub) {
        var ownerId = dbClub.UserId;
        var clubname = JSON.stringify(dbClub.clubname);
        clubname = clubname.replace(/^"(.+(?="$))"$/, '$1');
        if (ownerId === userId) {
          res.render("club", {
            clubname: clubname,
            id: 'Club ID: ' + dbClub.id,
            description: dbClub.description,
            message: 'You are the owner of this club!'
          });
        } else {

          db.UserClubs.count({ where: { ClubId: clubId, UserId: userId } }).then(function (count) {
            if (count === 0) {
              res.render("club", {
                clubname: clubname,
                id: 'Club ID: ' + dbClub.id,
                description: dbClub.description,
                message: 'Join club'
              });
            } else {
              res.render("club", {
                clubname: clubname,
                id: 'Club ID: ' + dbClub.id,
                description: dbClub.description,
                message: 'You are a member of this club!'
              });
            }
          });
        }
      });
    } else {
      db.Club.findOne({ where: { id: clubId } }).then(function (dbClub) {
        var clubname = JSON.stringify(dbClub.clubname);
        clubname = clubname.replace(/^"(.+(?="$))"$/, '$1');
        res.render("club", {
          clubname: clubname,
          id: 'Club ID: ' + dbClub.id,
          description: dbClub.description
        });
      });
    }
  });


  // Books GET route
  app.get("/books", function (req, res) {
    res.render('books');
  });


  // Logout 
  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.redirect('/');
    });
  });


};