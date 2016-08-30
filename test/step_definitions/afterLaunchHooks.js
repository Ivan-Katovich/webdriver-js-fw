'use strict';

var instance = require('./../support/driverFactory.js');

var hook = function(){

    this.registerHandler('AfterFeatures', function (event, callback) {
        console.log('FINISHING running scenarios');
        instance.quit()
            .then(function () {
                callback();
            });
    });

};

module.exports = hook;