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

  // Get All Users
  app.get('/api/users', function (req, res) {
    db.User.findAll().then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  // Get a User by id
  app.get('/api/users/:id', function (req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function (dbUser) {
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
      // var userClubInfo = { UserId: userId, ClubId: newclub.id };
      // db.UserClubs.create(userClubInfo);
    });
  });


  // Get all Clubs
  app.get('/api/clubs', function (req, res) {
    db.Club.findAll().then(function (dbClubs) {
      res.json(dbClubs);
    });
  });


  // Get a Club by id
  app.get('/api/clubs/:id', function (req, res) {
    db.Club.findOne({ where: { id: req.params.id } }).then(function (dbClub) {
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


};