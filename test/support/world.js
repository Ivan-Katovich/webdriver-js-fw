'use strict';

require('chromedriver');
require('geckodriver');

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    firefox = require('selenium-webdriver/firefox'),
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,

    profile = new firefox.Profile(),
    pathToSeleniumJar = process.cwd()+'\\selenium-server\\selenium-server-standalone-3.0.0-beta2.jar',
    // pathToSeleniumJar = 'selenium-server/selenium-server-standalone-3.0.0-beta2.jar',
    server = new SeleniumServer(pathToSeleniumJar, {port: 4444});

server.start();

profile.setPreference('browser.startup.page',0);
profile.setPreference('startup.homepage_welcome_url.additional','about:blank');
profile.setPreference('marionette', true);

var options = new firefox.Options().setProfile(profile);

// var Capabilities = require('selenium-webdriver/lib/capabilities').Capabilities;
// var capabilities = Capabilities.firefox();
// // capabilities.set('marionette', true);
// capabilities.set('browser.startup.page',0);
// capabilities.set('startup.homepage_welcome_url.additional','about:blank');
//
// var capabilities1 = {
//     'browserName' : 'firefox',
//     // 'marionette': true,
//     'browser.startup.page': 0,
//     'startup.homepage_welcome_url.additional': 'about:blank'
// };

function World() {
    this.server = server;
    this.driver = new webdriver.Builder()
        // .withCapabilities(capabilities)
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .usingServer(server.address())
        .build();
    this.baseUrl = 'http://www.travelsupermarket.com/';
}

module.exports = function() {
    this.World = World;
};