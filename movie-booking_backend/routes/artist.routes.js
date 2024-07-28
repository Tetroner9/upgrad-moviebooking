module.exports = app => {
    const artists = require('../controllers/artist.controller.js');
  
    var router = require('express').Router();
  
    // Retrieve all artists
    router.get('/', artists.findAllArtists);
  
    app.use('/api/artists', router);
  };
  