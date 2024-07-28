module.exports = app => {
    const users = require('../controllers/user.controller.js');
  
    var router = require('express').Router();
  
    // Sign Up
    router.post('/auth/signup', users.signUp);
  
    // Login
    router.post('/auth/login', users.login);
  
    // Logout
    router.post('/auth/logout', users.logout);
  
    app.use('/api', router);
  };
  