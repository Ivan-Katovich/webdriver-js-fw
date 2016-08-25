'use strict';

var steps = function() {

    this.setDefaultTimeout(60000);

    this.When(/^I navigate to page$/, function () {
        var world = this;
        return world.driver.sleep(5000)
            .then(function () {
                return world.driver.get(world.baseUrl);
            })
            .then(function () {
                return world.driver.sleep(5000);
            })
    });

    this.When(/^I sleep for '(.+)' sec and quit driver$/, function (sec) {
        var world = this;
        console.log(process.cwd());
        console.log('Waiting for '+sec+' sec');
        return world.driver.sleep(sec*1000)
            .then(function () {
                return world.driver.quit();
            })
            .then(function () {
                return world.server.stop();
            });
    });



};

module.exports = steps;