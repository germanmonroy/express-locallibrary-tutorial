const Author = require('../models/author');
const Book = require('../models/book');
const async = require('async');

// display list of all authors
exports.author_list = function(req, res, next) {
  Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) return next(err);
      res.render('author_list', { title: 'Author List', author_list: list_authors });
    });
};

// display detail page for a specific author
exports.author_detail = function(req, res, next) {
  async.parallel({
    author: function(callback) {
      Author.findById(req.params.id)
        .exec(callback);
    },
    author_books: function(callback) {
      Book.find({ 'author': req.params.id }, 'title summary')
        .exec(callback);
    }
  }, function(err, results) {
      if (err) return next(err);
      if (results.author == null) {
        const err = new Error('Author not found');
        err.status = 404;
        return next(err);
    }
    res.render('author_detail', { 
      title: 'Author Detail', 
      author: results.author, 
      author_books: results.author_books 
    })
  })
};

// display author create form on GET
exports.author_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Author create GET');
};

// handle author create on POST
exports.author_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Author create POST');
};

// display author delete form on GET
exports.author_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Author delete GET');
};

// handle author delete on POST
exports.author_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Author delete POST');
};

// display author update form on GET
exports.author_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Author update GET');
};

// handle author update on POST
exports.author_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Author update POST');
};