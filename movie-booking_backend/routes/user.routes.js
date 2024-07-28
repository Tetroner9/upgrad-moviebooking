module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/auth/signup", users.signUp);
  
    // Login a User
    router.post("/auth/login", users.login);
  
    // Logout a User
    router.post("/auth/logout", users.logout);
  
    // Get Coupon Code
    router.get("/getCouponCode", users.getCouponCode);
  
    // Book Show
    router.post("/bookShow", users.bookShow);
  
    app.use('/api', router);
  };
  