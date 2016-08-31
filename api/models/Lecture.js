/**
 * Lecture.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    description : { 
      type: 'string',
      required: true
    },

    video_url : { 
      type: 'string',
      required: true
    },

    serial_number : { 
      type: 'integer',
      required: true
    },

    course : { 
      model: 'course',
      required: true
    }
  }
};

