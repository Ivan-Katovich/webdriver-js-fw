'use strict';

var webdriver = require('selenium-webdriver'),
    capabilities = require('./../profile/capabilities.js');

var instance = (function(){
    var driver;
    if(!driver){
        driver = new webdriver.Builder()
            .withCapabilities(capabilities[process.env.BROWSER])
            .usingServer('http://localhost:4444/wd/hub')
            .build();
    }
    return driver;
})();

module.exports = instance;