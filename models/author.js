const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
  first_name: {type: String, required: true, maxLength: 100},
  family_name: {type: String, required: true, maxLength: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date}
});

// virtual for author's full name
AuthorSchema
  .virtual('name')
  .get(() => {
    return this.family_name + ', ' + this.first_name;
  });

// virtual for author's lifespan
AuthorSchema
  .virtual('lifespan')
  .get(() => {
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
  });

// virtual for author's url
AuthorSchema
  .virtual('url')
  .get(() => {
    return '/catalog/author' + this._id;
  });

module.exports = mongoose.model('Author', AuthorSchema);