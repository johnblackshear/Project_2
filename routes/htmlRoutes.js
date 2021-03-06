var db = require('../models');
var path = require("path");
var userSession;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = function (app) {

  //////////////////////////////////////
  // HOMEPAGE HTML ROUTES

  // Homepage HTMLGET route
  app.get('/', function (req, res) {
    console.log('I AM HERE ======');
    // db === database find all from club model
    db.Club.findAll({ where: { userCount: { [Op.gte]: 10 } }, limit: 8, order: [["userCount", "DESC"]] }).then(function (result) {
      // console.log('result++++++', result)
      //get response and put into index handelbars
      res.render('index', {
        // clubs is the key 
        Popclubs: result,

        clubs: result,
      })
    });

  });


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
        var location = userResult.location;
        var profilePic = '<img src="' + userResult.profilePic + '" alt="Profile Picture" width="150" height="150">';
        var count = "<span class=count></span>";
        var favAuthors = userResult.favAuthors;
        var favBooks = userResult.favBooks;
        var favGenres = userResult.favGenres;

        res.render('profile', {
          username: renderUsername,
          email: renderEmail,
          location: location,
          clublist: '<span class=join id=club-list data-userid=' + userSession.userid + '></span>',
          profilePic: profilePic,
          count: count,
          favAuthors: favAuthors,
          favBooks: favBooks,
          favGenres: favGenres,
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
  // Clubs HTML ROUTES

  // Add Club page GET route
  app.get('/addclub', function (req, res) {
    // If the user is logged in
    if (req.session.loggedin) {
      console.log("req.session: ", req.session);
      console.log("USERID: ", req.session.userid);
      var userid = req.session.userid;
      var username = req.session.username;
      res.render('addclub', {
        userid: userid,
        username: username
      });
    } else {
      // User is not logged in
      res.render('login', {
        msg: 'You are not logged in. Please log in to create a club:'
      });
    }
  });

  // Clubs HTML GET route
  app.get('/clubs', function (req, res) {
    // If the user is logged in
    if (req.session.loggedin) {
      db.Club.findAll({}).then(function (dbClubs) {
        res.render('clubs', {
          clubname: dbClubs,
          addclub: '<a href="/addclub" id="add-club">Add a Club</a>'
        });
      });
    } else {
      // User is not logged in
      db.Club.findAll({}).then(function (dbClubs) {
        res.render('clubs', {
          clubname: dbClubs,
          addclub: ''
        });
      });
    };
  });



  // Club GET ROUTE
  app.get("/clubs/:id", function (req, res) {
    var clubId = req.params.id;

    // If the user is logged in
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
            id: 'Club ID: ' + dbClub.id + '<span class=join id=join-btn-id data-clubid=' + dbClub.id + '></span>',
            description: dbClub.description,
            message: 'You are the owner of this club!',
            addbutton: '<button class="btn" id="event-add-btn" data-clubId=' + dbClub.id + '>Add Event</button>'

          });
        } else {
          db.User_Club.count({ where: { club_id: clubId, user_id: userId } }).then(function (count) {

            if (count === 0) {
              res.render("club", {
                clubname: clubname,
                id: 'Club ID: ' + dbClub.id + '<span class=join id=join-btn-id data-clubid=' + dbClub.id + '></span>',
                description: dbClub.description,
                message: '<button class="btn" id="club-join-btn" data-clubId=' + dbClub.id + '>Join Club</button>'
              });
            } else {
              res.render("club", {
                clubname: clubname,
                id: 'Club ID: ' + dbClub.id + '<span class=join id=join-btn-id data-clubid=' + dbClub.id + '></span>',
                description: dbClub.description,
                message: 'You are a member of this club!'
              });
            }

          });
        }

      });

    } else {

      console.log("***************** FIND ME *****************************");
      // User is not logged in
      db.Club.findOne({ where: { id: clubId } }).then(function (dbClub) {
        var clubname = JSON.stringify(dbClub.clubname);
        clubname = clubname.replace(/^"(.+(?="$))"$/, '$1');
        res.render("club", {
          clubname: clubname,
          id: 'Club ID: ' + dbClub.id + '<span class=join id=join-btn-id data-clubid=' + dbClub.id + '></span>',
          description: dbClub.description
        });
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
  // Edit Profile 
  app.get("/edit", function (req, res) {

    // If the user is logged in
    if (req.session.loggedin) {
      // Set userIdValue to the user's Id
      var userIdValue = req.session.userid;

      res.render('edit', {
        userid: '<div id="getUserId" data-userid="' + userIdValue + '"></div>'
      });

    } else {
      // User is not logged in
      res.render('login', {
        msg: 'You are not logged in. Please log in to edit your profile:'
      });
    }

  });
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













  // Add Event page GET route
  app.get('/clubs/:id/addevent', function (req, res) {
    var clubId = req.params.id;
    console.log("clubId: ", clubId);

    // If the user is logged in
    if (req.session.loggedin) {
      var userid = req.session.userid;
      var username = req.session.username;
      console.log("clubId: ", clubId);
      db.Club.findOne({ where: { id: clubId } }).then(function (dbClub) {
        var ownerId = dbClub.UserId;
        var clubname = JSON.stringify(dbClub.clubname);
        clubname = clubname.replace(/^"(.+(?="$))"$/, '$1');

        if (ownerId === userid) {
          res.render('addevent', {
            userid: userid,
            username: username,
            message: 'You are the owner of this club!',
            id: 'Club ID: ' + dbClub.id + '<span class=join id=theClubId data-clubid=' + dbClub.id + '></span>',


          });
        }

      });

    } else {
      res.redirect('/');
    }

  });


};