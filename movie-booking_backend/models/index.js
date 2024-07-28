const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = require('../config/db.config').url;
db.artists = require('./artist.model');
db.genres = require('./genre.model');
db.movies = require('./movie.model');
db.users = require('./user.model')(mongoose);

module.exports = db;
