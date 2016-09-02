/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  join: function(req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }

    Lecture.findOne({"id": req.params["id"]}).exec(function(err, group){
      if (err) {
        return res.serverError(err);
      }
      if (!group) {
        return res.notFound('Could not find group, sorry.');
      }

      var roomName = group.description;

      sails.log('Found "%s"', roomName);
      sails.sockets.join(req, roomName, function(err) {
        if (err) {
          return res.serverError(err);
        }

        return res.json({
          message: 'Subscribed to group: '+roomName+'!'
        });
      });
    });
  }
};

