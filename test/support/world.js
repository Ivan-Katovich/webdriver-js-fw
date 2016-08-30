'use strict';

function World() {
    this.driver = require('./driverFactory.js');
    this.q = require('q');
    this.moment = require('moment');
    this.baseUrl = 'http://www.travelsupermarket.com/';
}

module.exports = function() {
    this.World = World;
};