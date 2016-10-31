/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    content: {
      type: 'text',
      required: true,
      minLength: 5
    },
    author: {
      model: 'users',
      required: false
    },
    authorName: {
      type: 'string'
    }
    group: {
      model: 'lecture',
      required: true
    }
  },
  afterCreate: function(record, cb) {
    Lecture.findOne({"id": record.group}).exec(function(err, group){
      if (err) {
        return console.log('Error when looking for  group, sorry.');
      }
      if (!group) {
        return console.log('Could not find group, sorry.');
      }

      var roomName = group.description;

      Users.findOne({"id": record.author}).exec(function(err, user){
        if (!err) {
          record.author = user.name;
          sails.sockets.broadcast(roomName, record);
        } else {
          console.log("looking for user error: " + err);
        }
      });
    });
    cb();
  }
};

