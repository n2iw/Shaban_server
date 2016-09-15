/**
 * Course.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name : { type: 'string' },

    lecture_count : { 
      type: 'integer',
      notNull: true,
      defaultsTo: 0
    },

    lectures: {
      collection: 'lecture',
      via: 'course'
    }
  }
};

