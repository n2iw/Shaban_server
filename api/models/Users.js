/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    university_id: {
      type: 'integer',
      required: true
    },
    arabic_name: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    whatsapp: {
      type: 'string'
    },
    email: {
      type: 'string',
      email: true
    },
    location: {
      type: 'string',
      required: true
    }
  }
};

