'use strict';

var firefoxView = require('./../profile/view.js').other,
    isFirst = true;

var hooks = function(){

    this.Before(function () {
        var world = this;
        if(isFirst){
            isFirst = false;
            return world.driver.sleep(100)
                .then(function () {
                    if(process.env.BROWSER === 'firefox' || process.env.BROWSER === 'phantomjs'){
                        return world.driver.manage().window().setSize(firefoxView[process.env.VIEW].width, firefoxView[process.env.VIEW].height);
                    }
                });
        }else{
            return world.driver.sleep(100);
        }
    });

    this.After(function () {
        var world = this;
        return world.driver.executeScript('window.localStorage.clear();');
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