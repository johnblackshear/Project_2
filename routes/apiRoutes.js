var db = require('../models');

module.exports = function (app) {
  // Get all clubs
  app.get('/api/clubs', function (req, res) {
    db.Club.findAll({}).then(function (dbClubs) {
      res.json(dbClubs);
    });
  });

  // // Create a new club
  // app.post('/api/clubs', function (req, res) {
  //   console.log("test", req.body);
  //   db.Club.create(req.body).then(function (dbClub) {
  //     res.json(dbClub);
  //   });
  // });

  // Delete an club by id
  app.delete('/api/clubs/:id', function (req, res) {
    db.Club.destroy({ where: { id: req.params.id } }).then(function (dbClub) {
      res.json(dbClub);
    });
  });


// Create a new user
app.post('/api/register', function (req, res) {
  db.User.create(req.body).then(function (dbExample) {
    res.json(dbExample);
  });
});


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
    console.log("TESTING");
    var userClubInfo = {UserId: userId, ClubId: newclub.id};
    db.UserClubs.create(userClubInfo);
  });

});






};