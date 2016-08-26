'use strict';

var chromeView = require('./view.js').chrome;

var capabilities = {
    firefox: {
        'browserName' : 'firefox',
        'marionette': true,
        'browser.startup.page': 0,
        'startup.homepage_welcome_url.additional': 'about:blank'
    },
    phantomjs: {
        'browserName' : 'phantomjs',
        'phantomjs.binary.path': require('phantomjs').path
    },
    chrome: {
        'browserName' : 'chrome',
        'chromeOptions' : {
            'args': [chromeView[process.env.VIEW],'--disable-extensions']
        }
    }
};

module.exports = capabilities;