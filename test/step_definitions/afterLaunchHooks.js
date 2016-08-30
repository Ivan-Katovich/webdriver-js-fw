'use strict';

var instance = require('./../support/driverFactory.js');

var hook = function(){

    // this.registerHandler('AfterFeatures', function (event, callback) {
    //     console.log('FINISHING running scenarios');
    //     for(var i = 0; i<instance.driversPool.length; i++){
    //         instance.driversPool[i].quit();
    //         if(i===instance.driversPool.length-1){
    //             callback();
    //         }
    //     }
    // });

};

module.exports = hook;