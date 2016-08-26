'use strict';

var instance = require('./../support/driverFactory.js'),
    server = require('./../support/serverFactory.js'),
    firefoxView = require('./../profile/view.js').other,
    isFirst = true;

var hooks = function(){

    this.Before(function () {
        var world = this;
        if(isFirst){
            console.log('BEFORE first run');
            isFirst = false;
            return world.driver.sleep(3000)
                .then(function () {
                    if(process.env.BROWSER === 'firefox' || process.env.BROWSER === 'phantomjs'){
                        return world.driver.manage().window().setSize(firefoxView[process.env.VIEW].width, firefoxView[process.env.VIEW].height);
                    }
                });
        }else{
            console.log('BEFORE other runs');
            return world.driver.sleep(3000);
        }
    });

    this.After(function () {
        var world = this;
        console.log('AFTER');
        return world.driver.sleep(3000)
            .then(function () {
                return world.driver.executeScript('window.localStorage.clear();');
            });
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