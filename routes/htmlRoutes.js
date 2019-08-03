var db = require('../models');
var path = require("path");
var userSession;



module.exports = function (app) {

  //////////////////////////////////////
  // HOMEPAGE HTML ROUTES
  
 
  //Homepage HTMLGET route
  app.get('/', function (req, res) {
    console.log('I AM HERE ======');
      // db === database find all from club model
      db.Club.findAll({where:{},limit: 4, order: [['createdAt' ,'ASC']]}).then(function(result){
        // console.log('result++++++', result)
        //get response and put into index handelbars
        res.render('index', {
          // clubs is the key 
          clubs: result
        })
      // db.Club.findAll({}).then(function(result){
      //   res.render('index',{
      //     clubs: result
      //   })
      // })
      })
     
// //   // }
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
          username: renderUsername,
          email: renderEmail,
          clublist: '<span class=join id=club-list data-userid=' + userSession.userid + '>test</span>'
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


  // Clubs page GET route
  app.get('/clubs', function (req, res) {
    db.Club.findAll({}).then(function (dbClubs) {
      res.render('clubs', {
        clubname: dbClubs
      });
    });
  });
// Clubs page GET route
app.get('/pop_clubs', function (req, res) {
  db.Club.findAll({}).then(function (dbClubs) {
    res.render('popclubs', {
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
            id: 'Club ID: ' + dbClub.id + '<span class=join id=join-btn-id data-clubid=' + dbClub.id + '>test</span>',
            description: dbClub.description,
            message: 'You are the owner of this club!'
          });
        } else {
          db.User_Club.count({ where: { club_id: clubId, user_id: userId } }).then(function (count) {

            if (count === 0) {
              res.render("club", {
                clubname: clubname,
                id: 'Club ID: ' + dbClub.id + '<span class=join id=join-btn-id data-clubid=' + dbClub.id + '>test</span>',
                description: dbClub.description,
                message: '<button class="btn float-right" id="club-join-btn" data-clubId=' + dbClub.id + '>Join Club</button>'
              });
            } else {
              res.render("club", {
                clubname: clubname,
                id: 'Club ID: ' + dbClub.id + '<span class=join id=join-btn-id data-clubid=' + dbClub.id + '>test</span>',
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
        console.log("dbClub:", dbClub);
        console.log("ID:", id);
        // var clubname = JSON.stringify(dbClub.clubName);
        // clubname = clubname.replace(/^"(.+(?="$))"$/, '$1');
        // res.render("club", {
        //   clubname: clubname,
        //   id: 'Club ID: ' + dbClub.id + '<span class=join id=join-btn-id data-clubid=' + dbClub.id + '>test</span>',
        //   description: dbClub.description
        });
      // });

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
  //Search 
  // app.get('/', function(req, res){
  //   console.log("id:", id);
  //   var {term} = req.query;
  //   term = term.toLowerCase();

  //   db.Club.findOne({where: { id: { [Op.like]: '%' + term + '%'   } } })
  //   .then( res.redirect("clubs/" + term))
  
  // })

  // app.get('/api/:id', (req, res) => { 
  //   db.Club.findOne({ where: { id: clubId } }).then(function (dbClub) {
  //     res.render("api", {
  //       clubname: clubname,
  //       id: 'Club ID: ' + dbClub.id + '<span class=join id=join-btn-id data-clubid=' + dbClub.id + '>test</span>',
  //       description: dbClub.description,
  //     })
  //   })
  // });

}




  
