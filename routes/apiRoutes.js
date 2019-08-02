var db = require('../models');

module.exports = function (app) {

  ////////////////////////////////////////////////////////
  // API USERS

  // Register a new User
  app.post('/api/register', function (req, res) {
    db.User.create(req.body).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  //Update a user's profile
  app.post('/api/edit', function (req, res){
    db.User.update(req.body).then(function (dbUser) {
        res.json(dbUser);
    });

  });


  // Get All Users
  app.get("/api/users", function (req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Club
    db.User.findAll({
      include: [db.Club]
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });
  // app.get('/api/users', function (req, res) {
  //   db.User.findAll().then(function (dbUsers) {
  //     res.json(dbUsers);
  //   });
  // });




  // Get a User by id
  app.get('/api/users/:id', function (req, res) {
    db.User.findAll({
      include: [db.Club],
      where: { id: req.params.id }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });




  // Get a User's clubs
  app.get('/api/users/:id/clubs', function (req, res) {
    db.User.findAll({
      include: [db.Club, { model: db.Club, as: 'Clubs2' }],
      where: { id: req.params.id }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });
  




  // Delete a User by id
  app.delete('/api/users/:id', function (req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function (dbUser) {
      res.json(dbUser);
    });
  });
  ////////////////////////////////////////////////////////


  ////////////////////////////////////////////////////////
  // API CLUBS

  // Create a new club
  app.post('/api/addclub', function (req, res) {
    console.log("* * * * ****** * * *");
    console.log("req.body", req.body);
    console.log("req.session", req.session);
    var clubInfo = req.body;
    var userId = req.session.userid;
    clubInfo.UserId = userId;
    db.Club.create(req.body).then(function (newclub) {
      res.json(newclub);
      var userClubInfo = { user_id: userId, club_id: newclub.id };
      db.User_Club.create(userClubInfo);
    });
  });


  // Get all Clubs
  app.get('/api/clubs', function (req, res) {
    db.Club.findAll().then(function (dbClubs) {
      res.json(dbClubs);
    });
  });


  // // Get a Club by id
  // app.get('/api/clubs/:id', function (req, res) {
  //   db.Club.findOne({
  //     include: [{model: db.User, as: 'Users', include: 
  //     [{model: db.Event}]
  //   }],
  //     where: { id: req.params.id }
  //   }).then(function (dbClub) {
  //     res.json(dbClub);
  //   });
  // });

// ??????????????????????????????????????????????????

  // Get a Club by id
  app.get('/api/clubs/:id', function (req, res) {
    db.Club.findOne({
      include: [{model: db.User, as: 'Users'}],
      where: { id: req.params.id }
    }).then(function (dbClub) {
      res.json(dbClub);
    });
  });

//   include: [{model: Tool, as: 'Instruments', include: 
//       [
//         { 
//           model: Teacher, include: [ /* etc */] 
//         }
//       ]
//     }
//   ]
//     ??????????????????????????????????????????????????



      // Join a club by id
      app.post('/api/clubs/:id', function (req, res) {
        var userId = req.session.userid;
        var clubId = req.params.id;
        var userClubInfo = { user_id: userId, club_id: clubId };
        console.log("HEY TEST");
        console.log("userId:", userId);
        console.log("clubId:", clubId);
        db.User_Club.create(userClubInfo).then(function (dbClub) {
          res.json(dbClub);
        });
      });


  // // Get a Club Owner
  // app.get('/api/clubs/:id/owner', function (req, res) {
  //   db.Club.getOwner({ where: { id: req.params.id } }).then(function (dbClub) {
  //     res.json(dbClub);
  //   });
  // });



  ////////////////////////////////////////////////////////
  // CLUB EVENTS API ROUTES

  // Get a Clubs's events
  app.get('/api/clubs/:id/events', function (req, res) {
    db.Event.findAll({
      where: { ClubId: req.params.id },
      order: [
        ['date', 'DESC']
    ],
    }).then(function (dbClubEvents) {
      res.json(dbClubEvents);
    });
  });

  // Create an event
  app.post('/api/clubs/:id/addevent', function (req, res) {
    var newEventInfo = req.body;
    newEventInfo.ClubId = req.params.id;
    console.log("newEventInfo: ", newEventInfo);
    db.Event.create(newEventInfo).then(function (newClubEvent) {
      res.json(newClubEvent);
    })
  })



};