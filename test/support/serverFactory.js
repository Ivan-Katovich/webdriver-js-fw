var SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
    pathToSeleniumJar = process.cwd()+'\\selenium-server\\selenium-server-standalone-3.0.0-beta2.jar';

var instanse = (function(){
    var server;
    if(!server){
        server = new SeleniumServer(pathToSeleniumJar, {port: 4444});
        server.start();
    }
    return server;
})();

module.exports = instanse;

