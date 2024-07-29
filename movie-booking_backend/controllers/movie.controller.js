const db = require('../models');
const Movie = db.movies;

// Find all movies by status
exports.findAllMovies = (req, res) => {
  const status = req.query.status;
  let condition = status ? { status: { $regex: new RegExp(status), $options: "i" } } : {};

  Movie.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving movies."
      });
    });
};

// Find a single movie by ID
exports.findOne = (req, res) => {
  const id = req.params.movieId;

  Movie.findOne({ movieId: id })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Not found Movie with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Movie with id=" + id });
    });
};

// Find shows of a specific movie
exports.findShows = (req, res) => {
  const id = req.params.movieId;

  Movie.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Movie with id " + id });
      else res.send(data.shows); // Assuming shows is a field in the movie document
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving shows for Movie with id=" + id });
    });
};
