'use strict';

var instance = require('./driverFactory.js');

function World() {
    instance.addDriver();
    this.threedNum = instance.counter-1;
    this.driver = instance.driversPool[instance.counter-1];
    this.q = require('q');
    this.moment = require('moment');
    this.baseUrl = 'http://www.travelsupermarket.com/';
}

module.exports = function() {
    this.World = World;
};