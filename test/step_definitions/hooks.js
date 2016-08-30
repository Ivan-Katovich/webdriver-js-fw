'use strict';

var firefoxView = require('./../profile/view.js').other,
    driverThreed,
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
            })
            .then(function () {
                return world.driver.quit();
            });
    });

    this.After(function (scenario) {
        var world = this;
        if(scenario.isFailed()){
            return world.driver.takeScreenshot()
                .then(function (stream) {
                    var decodedImage = new Buffer(stream, 'base64');
                    return scenario.attach(decodedImage, 'image/png');
                });
        }
    });

};

module.exports = hooks;