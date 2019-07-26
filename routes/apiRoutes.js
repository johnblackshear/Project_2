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



};