const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieid: { type: Number, required: true },
  title: { type: String, required: true },
  published: { type: Boolean, required: true },
  released: { type: Boolean, required: true },
  poster_url: { type: String },
  release_date: { type: String },
  publish_date: { type: String },
  artists: { type: Array, default: [] },
  genres: { type: Array, default: [] },
  duration: { type: Number },
  critic_rating: { type: Number },
  trailer_url: { type: String },
  wiki_url: { type: String },
  story_line: { type: String },
  shows: { type: Array, default: [] }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
