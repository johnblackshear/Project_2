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
    db.Club.findAll({}).then(function (dbClubs) {
      res.render('clubs', {
        clubname: dbClubs
      });
    });
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


  // Add Club page POST route
  app.post("/addclub", function (req, res) {
    // If the user is logged in
    if (req.session.loggedin) {
      db.Club.create(req.body).then(function (dbClub) {
        res.json(dbClub);
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
    db.Club.findOne({ where: { id: req.params.id } }).then(function (dbClub) {
      var clubname = JSON.stringify(dbClub.clubname);
      clubname = clubname.replace(/^"(.+(?="$))"$/, '$1');
      res.render("club", {
        clubname: 'Clubname: ' + clubname,
        id: 'ID: ' + dbClub.id,
        description: dbClub.description
      });
    });
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