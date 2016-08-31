/**
 * LectureController
 *
 * @description :: Server-side logic for managing lectures
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  join: function(req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }

    Lecture.findOne({"id": req.params["id"]}).exec(function(err, lecture){
      if (err) {
        return res.serverError(err);
      }
      if (!lecture) {
        return res.notFound('Could not find lecture, sorry.');
      }

      var roomName = lecture.description;

      sails.log('Found "%s"', roomName);
      sails.sockets.join(req, roomName, function(err) {
        if (err) {
          return res.serverError(err);
        }

        return res.json({
          message: 'Subscribed to  discussion for lecture: '+roomName+'!'
        });
      });
    });
  }
	
};

