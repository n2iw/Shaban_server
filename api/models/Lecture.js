/**
 * Lecture.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    course : { 
      model: 'course',
      required: true
    },

    serial_number : { 
      type: 'integer',
      required: true
    },

    description : { 
      type: 'string',
      required: true
    },

    transcript_url: {
      type: 'string'
    },

    videos: {
      collection: 'video',
      via: 'lecture'
    }

  }
};

