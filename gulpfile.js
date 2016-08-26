var gulp = require('gulp'),
    cucumber = require('gulp-cucumber'),
    selenium = require('selenium-standalone'),
    util = require('gulp-util');

gulp.task('selenium', function (done) {
    selenium.install({
        version: '3.0.0-beta2',
        baseURL: 'https://selenium-release.storage.googleapis.com',
        // drivers: {
        //     chrome: {
        //         version: '2.23',
        //         arch: process.arch,
        //         baseURL: 'https://chromedriver.storage.googleapis.com'
        //     },
        //     firefox: {
        //         version: '0.10.0',
        //         arch: process.arch,
        //         baseURL: 'https://github.com/mozilla/geckodriver/releases/download'
        //     }
        // },
        logger: function (message) {
            console.log('00000000000 '+message);
        }
    }, function (err) {
        if (err) return done('111111111111 '+err);

        selenium.start(function (err, child) {
            if (err) return done(err);
            selenium.child = child;
            done();
        });
    });
});

gulp.task('cucumber'/*,['selenium']*/ , function() {
    util.env.browser ? process.env.BROWSER = util.env.browser : process.env.BROWSER = 'chrome';
    util.env.view ? process.env.VIEW = util.env.view : process.env.VIEW = 'desktop';
    console.log('\n Tests are raning on "'+process.env.BROWSER+'" browser\n');
    return gulp.src('test/features/*')
        .pipe(cucumber({
            'steps': 'test/step_definitions/*.js',
            'support': 'test/support/*.js',
            'format': 'pretty'
        }));
});

gulp.task('test', ['cucumber'], function () {
    return selenium.child.kill();
});