const db = require('../models');
const User = db.users;
const Coupon = db.coupons;  // Assuming you have a Coupon model defined
const Booking = db.bookings;  // Assuming you have a Booking model defined
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
      message: "Content can not be empty!"
    });
  }

  User.findOne({
    username: req.body.username,
    password: b2a.btoa(req.body.password)
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found."
        });
      }
      user.isLoggedIn = true;
      user.save();
      res.send({
        uuid: user.uuid,
        access_token: user.access_token
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error occurred while logging in."
      });
    });
};

// Logout
exports.logout = (req, res) => {
  if (!req.body.uuid) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.findOne({ uuid: req.body.uuid })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found."
        });
      }
      user.isLoggedIn = false;
      user.save();
      res.send({
        message: "User logged out successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error occurred while logging out."
      });
    });
};

// Get Coupon Code
exports.getCouponCode = (req, res) => {
  // Assuming you have logic to get a coupon code for the user
  const couponCode = "DISCOUNT2024"; // Example static coupon code
  res.send({ couponCode });
};

// Book Show
exports.bookShow = (req, res) => {
  if (!req.body.userId || !req.body.showId || !req.body.tickets) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const booking = new Booking({
    userId: req.body.userId,
    showId: req.body.showId,
    tickets: req.body.tickets,
    bookingId: uuidv4()
  });

  booking.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while booking the show."
      });
    });
};
