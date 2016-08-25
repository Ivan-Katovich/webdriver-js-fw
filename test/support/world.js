'use strict';

var instance = require('./driverFactory.js');

function World() {
    this.driver = instance;
    this.baseUrl = 'http://www.travelsupermarket.com/';
}

module.exports = function() {
    this.World = World;
};