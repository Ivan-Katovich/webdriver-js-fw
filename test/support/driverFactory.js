var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    firefox = require('selenium-webdriver/firefox'),

    profile = new firefox.Profile();

profile.setPreference('browser.startup.page',0);
profile.setPreference('startup.homepage_welcome_url.additional','about:blank');
profile.setPreference('marionette', true);

var options = new firefox.Options().setProfile(profile);

var instance = (function(){
    var driver;
    if(!driver){
        var server = require('./serverFactory.js');
        driver = new webdriver.Builder()
        // .withCapabilities(capabilities)
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .usingServer(server.address())
            .build();
    }
    return driver;
})();

module.exports = instance;