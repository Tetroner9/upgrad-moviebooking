module.exports = app => {
    const movies = require('../controllers/movie.controller.js');
  
    var router = require('express').Router();
  
    // Retrieve all movies
    router.get('/', movies.findAllMovies);
  
    // Retrieve movies by status
    router.get('/?status=PUBLISHED', movies.findAllMovies);
    router.get('/?status=RELEASED', movies.findAllMovies);
  
    // Retrieve a single movie with id
    router.get('/:movieId', movies.findOne);
  
    // Retrieve shows of a movie with id
    router.get('/:movieId/shows', movies.findShows);
  
    app.use('/api/movies', router);
  };
  