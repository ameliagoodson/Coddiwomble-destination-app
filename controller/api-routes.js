// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    //console.log(req.user);
    res.json({
      username: req.user.username,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

  app.post("/api/destination", function (req, res) {
    db.Destination.create({
      location: req.body.location,
      UserId: req.user.id,
    }).then(function(dbDestination){
      res.json(dbDestination);
    }).catch(function (err) {
      res.status(422).json(err);
    });
  });

  app.get("/api/destination", function (req, res) {
    if (!req.user) {
      //The user is not logged in, send back an empty object
      res.status(401).json({body:"LOG IN !"});
    } else {
      db.Destination.findAll({
        where: {
          UserId: req.user.id
        }
      }) .then(function (response) {
        res.json({
          data : response,
        });
      });

    }
  });

  app.delete("/api/destination/:id", function(req, res) {
    db.Destination.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbDestination) { //do i put the members function here??
      res.json(dbDestination);
    });
  });

  
  //Get route for returning user posts to landing page. 
  app.get("/api/landing", function (req, res) {
    var query = {};
    if (req.query.username) {
      query.username = req.query.username;
    }
    db.Destination.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });


};
