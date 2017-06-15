/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    seed: function(req, res) {
        Admin.create({userName: "admin@shaban.com", password: "", salt: ""}).exec(function(err, ad){
            if (err) {
                return res.serverError(err);
            }

            ad.setPassword("ualbany2017");
            ad.save();

            return res.json(ad);
        });
    },

    authenticate: function(req, res) {
        // Development shortcut
        //req.session.user = {userName: 'admin@shaban.com'};
        //return res.redirect('/course/list');

        var pswd = req.param('password');
        var userName = req.param('userName');
        if (!pswd || !userName) {
            return res.view('auth_failed', {'title': "Login failed"});
        }

        Admin.findOne({'userName': userName}).exec(function(err, usr){
            if (err) {
                return res.badRequest(err);
            }


            if (!usr || !usr.isCorrectPassword(pswd)) {
                return res.view('auth_failed', {'title': "Login failed"});
            } else {
                req.session.user = usr;
                return res.redirect('/course/list');
            }

        });
    },

    logout: function(req, res){
        delete req.session.user;
        res.redirect('/login');
    }
};

