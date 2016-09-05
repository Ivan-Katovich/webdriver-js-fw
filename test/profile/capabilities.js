'use strict';

var chromeView = require('./view.js').chrome;

var capabilities = {
    firefox: {
        'browserName' : 'firefox',
        'proxy': {
            'proxyType': 'manual',
            'httpProxy': 'localhost:8081',
            'sslProxy': 'localhost:8081'
        },
        'marionette': true,
        'browser.startup.page': 0,
        'startup.homepage_welcome_url.additional': 'about:blank'
    },
    phantomjs: {
        'browserName' : 'phantomjs',
        'proxy': {
            'proxyType': 'manual',
            'httpProxy': 'localhost:8081',
            'sslProxy': 'localhost:8081'
        },
        'phantomjs.binary.path': require('phantomjs').path
    },
    chrome: {
        'browserName' : 'chrome',
        'proxy': {
            'proxyType': 'manual',
            'httpProxy': 'localhost:8081',
            'sslProxy': 'localhost:8081'
        },
        'chromeOptions' : {
            'args': [chromeView[process.env.VIEW],'--disable-extensions']
        }
    }
};

module.exports = capabilities;