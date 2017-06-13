var path = require('path');

module.exports = {
    edit: function(req, res) {
        var id = req.param('id');
        Video.findOne({id: id}, function(err, video){
            if (err) {
                return res.negotiate(err);
            }

            return res.view('edit_video', {video: video});

        });
    },

    delete: function(req, res) {
        var videoId = req.param('id');
        Video.destroy({id: videoId}, function(err, videos){
            if (err) {
                return res.negotiate(err);
            }
            var video = videos[0];
            return res.redirect('/lecture/' + video.lecture + '/edit');
        });
    }, 

    create: function(req, res){
        var title = req.param('title');
        var videoId = req.param('id');
        var lectureId = req.param('lecture');
        var order = req.param('order');

        if (!title || !lectureId  || !order || !req.file('video')) {
            return res.badRequest('Video title | order | file is required!');
        }

        var uploadFile = function(video){
            uploader.uploadFile(req, 'video', function(folder){
                var videoURL = '/files/' + path.basename(folder);

                if (video.url) {
                    uploader.removeFile(video.url);
                }

                Video.update({id: video.id}, {url: videoURL}, function(err, video){
                    if (err) {
                        return res.negotiate(err);
                    }
                    return res.redirect('/lecture/' + lectureId +'/edit');
                });
            }, function(err){
                if (err) {
                    return res.negotiate(err);
                } else {
                    return res.redirect('/lecture/' + lectureId +'/edit');
                }
            });
        };
        
        if ( videoId === '0') {
            Video.create({title: title, lecture: lectureId, order: order, url: ''}, function(err, video){
                if (err) {
                    return res.negotiate(err);
                }
                uploadFile(video);
            });
        } else {
            Video.update({id: videoId}, {title: title, order: order}, 
                function(err, videos){
                    if (err) {
                        return res.negotiate(err);
                    }
                    uploadFile(videos[0]);
            });
        }
         
    }
	
};
