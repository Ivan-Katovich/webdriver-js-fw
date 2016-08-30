'use strict';

var webdriver = require('selenium-webdriver'),
    capabilities = require('./../profile/capabilities.js');

// var instance = (function(){
//     var driver;
//     if(!driver){
//         driver = new webdriver.Builder()
//             .withCapabilities(capabilities[process.env.BROWSER])
//             .usingServer('http://localhost:4444/wd/hub')
//             .build();
//     }
//     return driver;
// })();

var instance = {
    driversPool: [],
    counter: 0,
    addDriver: function(){
        var driver = new webdriver.Builder()
            .withCapabilities(capabilities[process.env.BROWSER])
            .usingServer('http://localhost:4444/wd/hub')
            .build();
        this.counter+=1;
        this.driversPool.push(driver);
    }
};

module.exports = instance;