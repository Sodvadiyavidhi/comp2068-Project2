// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/
const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  language: {
    type: String,
    required: true
  },

  hoursPerWeek: {
    type: Number,
    required: true
  },

  level: {
    type: String,
    enum: ['BASIC','FLUENT'],
    required: true
  }
},
  {
      timestamps: true
  });
  LanguageSchema.query.drafts = function () {
    return this.where({
      status: 'BASIC'
    })
  };
  
  LanguageSchema.query.published = function () {
    return this.where({
      status: 'FLUENT'
    })
  };

module.exports = mongoose.model('Language', LanguageSchema);

