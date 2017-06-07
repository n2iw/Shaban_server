/*
 * Only allow find one user at a time
 *
 */

module.exports = function (req, res, next){
    if (req.param('phone')) {
        return next();
    }

    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden('You are not permitted to perform this action.');
}
