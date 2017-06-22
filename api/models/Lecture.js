/**
 * Lecture.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uploader = require('../services/uploader');
var path = require('path');

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

    },

    afterDestroy: function(lectures, cb){
        for (lecture of lectures) {
            if (lecture.transcript_url) {
                console.log("Deleting ", path.basename(lecture.transcript_url));
                uploader.removeFile(lecture.transcript_url);
            }
            Video.destroy({lecture: lecture.id}).exec(function(err){
                if (err) {
                    console.log(err);
                }
            });
            Messages.destroy({group: lecture.id}).exec(function(err){
                if (err) {
                    console.log(err);
                }
            });
        }

        cb();
    },

/*    beforeUpdate: function(valuesToUpdate, cb) {*/
        //console.log("beforeUpdate");
        //console.log(valuesToUpdate);

        //if(valuesToUpdate.transcript_url) {
            //Lecture.findOne(valuesToUpdate.id).exec(err, function(lecture){
                    //if (err) {
                        //cb(err);
                    //}
                    
                    //if (!lecture) {
                        //return cb(new Error("Lecture not found!"));
                    //}

                    //if (lecture.transcript_url && valuesToUpdate.transcript_url !== lecture.transcript_url){
                        //console.log("Deleting ", path.basename(this.transcript_url));
                        //uploader.removeFile(lecture.transcript_url);
                    //}
                    //cb();
                //});
        //} else {
            //cb();
        //}

    /*}*/

};

