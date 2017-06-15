var path = require('path');
var fs = require('fs');

var uploadFile = function(req, param, success_cb, err_cb) {
    req.file(param).upload(
        { dirname: uploadPath(), maxBytes: 100000000}, 
        function(err, uploadedFiles){
            if (err) {
                return err_cb(err);
            }

            if (uploadedFiles.length === 0){
                return err_cb(undefined);
            }

            return success_cb(uploadedFiles[0].fd);
    });
};

var removeFile = function(fileName){
    //Reomve file
    fs.unlink(uploadPath(path.basename(fileName)), function(err){
        if (err) {
            console.log(err);
        }
    });
};

var uploadPath = function() {
    var result = sails.config.uploadFolder;
    for (var i = 0; i < arguments.length; ++i) {
        result = path.join(result, arguments[i]);
    }
    return result;
};

module.exports = {
    uploadFile: uploadFile,
    removeFile: removeFile,
    uploadPath: uploadPath
}
