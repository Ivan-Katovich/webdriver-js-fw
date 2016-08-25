'use strict';

var steps = function() {

    this.When(/^I say '(.+)'$/, function (say) {
        var world = this;
        console.log(say);
        return world.driver.sleep(9000);
    });

};

module.exports = steps;