'use strict';

require('chromedriver');
require('geckodriver'); //have to extract geckodriver.exe from zip file manually (node-geckodriver issue)
require('phantomjs');

var webdriver = require('selenium-webdriver'),
    capabilities = require('./../profile/capabilities.js');

var instance = (function(){
    var driver;
    if(!driver){
        var server = require('./serverFactory.js');
        driver = new webdriver.Builder()
            .withCapabilities(capabilities[process.env.BROWSER])
            .usingServer(server.address())
            .build();
    }
    return driver;
})();

module.exports = instance;