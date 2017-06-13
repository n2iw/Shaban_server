/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var crypto = require('crypto');

module.exports = {

    attributes: {
        userName: {
            type: 'string',
            minLength: 5,
            required: true,
            unique: true
        },

        salt: {
            type: 'string',
        },

        password: {
            type: 'string',
        },

        makeSalt: function() {
            return crypto.randomBytes(16).toString('base64');
        },

        encryptPassword: function(password) {
            if (!password || !this.salt) return '';
            var salt = new Buffer(this.salt, 'base64');
            return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
        },

        setPassword: function(password) {
            if (!password) {
                return;
            }

            if (!this.salt) {
                this.salt = this.makeSalt();
            }

            this.password = this.encryptPassword(password)
        },

        isCorrectPassword: function (password) {
            if (!password) {
                return false;
            }

            return this.password === this.encryptPassword(password)
        }
    }

};

