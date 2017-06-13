var sd = require('skipper-disk');
var uploader = require('../services/uploader');

module.exports = {
    findOne: function(req, res){
        var filename = req.param('filename');
        var fileAdapter = sd({dirname: sails.config.uploadFolder});

        //res.set("Content-disposition", "attachment; filename='" + filename + "'");
        res.set("Content-disposition", "inline");

        var path = uploader.uploadPath(filename);

        // Stream the file down
        fileAdapter.read(path)
            .on('error', function (err){
                return res.serverError(err);
            })
            .pipe(res);
    }
}
