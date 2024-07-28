const db = require('../models');
const User = db.users;
const { v4: uuidv4 } = require('uuid');
const TokenGenerator = require('uuid-token-generator');
const b2a = require('b2a');

const tokgen = new TokenGenerator();

// Sign Up
exports.signUp = (req, res) => {
  if (!req.body.first_name || !req.body.last_name || !req.body.password) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: `${req.body.first_name}${req.body.last_name}`,
    password: b2a.btoa(req.body.password),
    uuid: uuidv4(),
    access_token: tokgen.generate(),
    isLoggedIn: false
  });

  user.save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
};

// Login
exports.login = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      message: "Username and password can not be empty!"
    });
  }

  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found!"
        });
      }

      if (user.password !== b2a.btoa(req.body.password)) {
        return res.status(401).send({
          message: "Invalid password!"
        });
      }

      user.isLoggedIn = true;
      user.access_token = tokgen.generate();

      user.save(user)
        .then(data => {
          res.send({
            uuid: data.uuid,
            access_token: data.access_token
          });
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while updating the User."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while logging in."
      });
    });
};

// Logout
exports.logout = (req, res) => {
  if (!req.body.uuid) {
    return res.status(400).send({
      message: "UUID can not be empty!"
    });
  }

  User.findOne({ uuid: req.body.uuid })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found!"
        });
      }

      user.isLoggedIn = false;
      user.access_token = null;

      user.save(user)
        .then(data => {
          res.send({
            message: "User logged out successfully!"
          });
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Some error occurred while updating the User."
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while logging out."
      });
    });
};
