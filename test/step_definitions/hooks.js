'use strict';
var instance = require('./../support/driverFactory.js'),
    server = require('./../support/serverFactory.js');

var hooks = function(){

    this.Before(function () {
        var world = this;
        console.log('BEFORE');
        return world.driver.sleep(3000);
    });

    this.After(function () {
        var world = this;
        console.log('AFTER');
        return world.driver.sleep(3000);
    });

    this.registerHandler('AfterFeatures', function (event, callback) {
        console.log('FINISHING running scenarios');
        instance.quit()
            .then(function () {
                return server.stop();
            })
            .then(function () {
                callback();
            });
    });
};

module.exports = hooks;