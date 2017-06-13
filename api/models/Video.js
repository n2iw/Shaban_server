var uploader = require('../services/uploader');
var path = require('path');

module.exports = {
    attributes: {
        lecture: {
            model: 'lecture'
        },

        title: {
            type: 'string'
        },

        url : { 
            type: 'string'
        },

        order: {
            type: 'integer'
        }
    },
    
    afterDestroy: function(videos, cb){
        for (video of videos) {
            if (video.url) {
                console.log("Deleting ", path.basename(video.url));
                uploader.removeFile(video.url);
            }
        }

        cb();
    },


}


