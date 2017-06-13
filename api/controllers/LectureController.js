/**
 * LectureController
 *
 * @description :: Server-side logic for managing lectures
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var uploader = require('../services/uploader');
var path = require('path');

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
    },

    delete: function(req, res) {
        var lectureId = req.param('id');
        Lecture.destroy({id: lectureId}, function(err, lectures){
            if (err) {
                return res.negotiate(err);
            }
            var lecture = lectures[0];
            return res.redirect('/course/' + lecture.course + '/edit');
        });
    }, 

    create: function(req, res) {
        var description = req.param('description');
        var courseId = req.param('course');
        var lectureId = req.param('id');
        var order = req.param('serial_number');

        if (!description || !courseId  || !order) {
            return res.badRequest('Lecture description | order is required!');
        }

        var uploadFile = function(lecture){
            uploader.uploadFile(req, 'transcript', function(folder){
                var transcriptUrl = '/files/' + path.basename(folder);

                if (lecture.transcript_url) {
                    uploader.removeFile(lecture.transcript_url);
                }

                Lecture.update({id: lecture.id}, {transcript_url: transcriptUrl}, function(err, lecture){
                    if (err) {
                        return res.negotiate(err);
                    }
                    return res.redirect('/course/' + courseId +'/edit');
                });
            }, function(err){
                if (err) {
                    return res.negotiate(err);
                } else {
                    return res.redirect('/course/' + courseId +'/edit');
                }
            });
        };
        
        if ( lectureId === '0') {
            Lecture.create({description: description, course: courseId, serial_number: order}, function(err, lecture){
                if (err) {
                    return res.negotiate(err);
                }
                uploadFile(lecture);
            });
        } else {
            Lecture.update({id: lectureId}, {description: description, serial_number: order}, 
                function(err, lectures){
                    if (err) {
                        return res.negotiate(err);
                    }
                    //var lecture = lectures[0];
                    uploadFile(lectures[0]);

            });
        }
    },

    edit: function(req, res) {
        var lectureId = req.param('id');
        Lecture.findOne({id: lectureId}, function(err, lecture){
            if (err) {
                return res.negotiate(err);
            }

            Course.findOne({id: lecture.course}, function(err, course) {
                if (err) {
                    return res.negotiate(err);
                }

                Video.find({lecture: lectureId}).sort("id ASC").exec(function(err, videos){
                    if (err) {
                        return res.negotiate(err);
                    }

                    return res.view('edit_lecture', {title: 'Edit Lecture', c: course, lecture: lecture, videos: videos, video: undefined});
                });
            });

        });
    },

};

