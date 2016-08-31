'use strict';

var steps = function() {

    this.When(/^I say '(.+)'$/, function (say) {
        var world = this;
        return world.driver.sleep(3000);
    });

    this.Then(/^first number '(\d+)' equals to second number '(\d+)'$/, function (first,second) {
        first = first*1;
        second = second*1;
        return expect(first).to.equal(second);
    });

};

module.exports = steps;