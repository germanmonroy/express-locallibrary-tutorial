const Genre = require('../models/genre');
const Book = require('../models/book');
const async = require('async');

// display list of all genre
exports.genre_list = function(req, res) {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_genres) {
      if (err) return next(err);
      res.render('genre_list', { title: 'Genre List', genre_list: list_genres });
    });
};

// display detail page for a specific genre
exports.genre_detail = function(req, res) {
  async.parallel({
    genre: function(callback) {
      Genre.findById(req.params.id)
        .exec(callback);
    },
    genre_books: function(callback) {
      Book.find({ 'genre': req.params.id })
        .exec(callback);
    }
  }, function(err, results) {
      if (err) return next(err)
      if (results.genre == null) {
        const err = new Error('Genre not found');
        err.status = 404;
        return next(err)
      }
      res.render('genre_detail', { 
        title: 'Genre Detail', 
        genre: results.genre, 
        genre_books: results.genre_books 
      });
  });
};

// display genre create form on GET
exports.genre_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre create GET');
};

// handle genre create on POST
exports.genre_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre create POST');
};

// display genre delete form on GET
exports.genre_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre delete GET');
};

// handle genre delete on POST
exports.genre_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre delete POST');
};

// display genre update form on GET
exports.genre_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre update GET');
};

// handle genre update on POST
exports.genre_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Genre update POST');
};