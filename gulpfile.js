
require('chromedriver');
require('geckodriver'); //have to extract geckodriver.exe from zip file manually (node-geckodriver issue)
require('phantomjs');

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    cucumber = require('gulp-cucumber'),
    selenium = require('selenium-standalone'),
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
    reporter = require('cucumber-html-reporter'),
    fsp = require('fs-promise'),
    util = require('gulp-util'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    server,
    name = '',
    name2 = '';

gulp.task('test', function(){
    runSequence('server',
        'onPrepare',
        'cucumber',
        'reportHtml');
});

gulp.task('parallel', function(){
    runSequence('server',
        'onPrepare',
        ['cucumber','cucumber2'],
        'reportHtml');
});

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

gulp.task('server', function(){
    var pathToSeleniumJar = require('path').join(__dirname, 'selenium-server', 'selenium-server-standalone-3.0.0-beta2.jar');
    server = new SeleniumServer(pathToSeleniumJar, {port: 4444});
    return server.start();
});

gulp.task('onPrepare', function(){
    return fsp.emptyDir('test/reports/json')
        .then(function () {
            return fsp.emptyDir('test/reports/html');
        })
        .then(function () {
            chai.use(chaiAsPromised);
            expect = chai.expect;
        });
});

gulp.task('cucumber', function() {
    util.env.browser ? process.env.BROWSER = util.env.browser : process.env.BROWSER = 'chrome';
    util.env.view ? process.env.VIEW = util.env.view : process.env.VIEW = 'desktop';
    console.log('\n Tests are raning on "'+process.env.BROWSER+'" browser\n');
    console.log(' "'+process.env.VIEW+'" view has setup\n');
    name += 'cucumber-report-id';
    name += Math.floor((Math.random() * 900) + 100);
    name += '(' + process.env.BROWSER;
    name += '-' + process.env.VIEW;
    name += ')';
    return gulp.src('test/features/*')
        .pipe(cucumber({
            'steps': 'test/step_definitions/*.js',
            'support': 'test/support/*.js',
            'format': 'json:test/reports/json/json-'+name+'.json',
            'emitErrors': false
        }));
});

gulp.task('cucumber2', function() {
    util.env.browser ? process.env.BROWSER = util.env.browser : process.env.BROWSER = 'chrome';
    util.env.view ? process.env.VIEW = util.env.view : process.env.VIEW = 'desktop';
    console.log('\n Tests are raning on "'+process.env.BROWSER+'" browser\n');
    console.log(' "'+process.env.VIEW+'" view has setup\n');
    name2 += 'cucumber-report-id';
    name2 += Math.floor((Math.random() * 900) + 100);
    name2 += '(' + process.env.BROWSER;
    name2 += '-' + process.env.VIEW;
    name2 += ')';
    return gulp.src('test/features/*')
        .pipe(cucumber({
            'steps': 'test/step_definitions/*.js',
            'support': 'test/support/*.js',
            'format': 'json:test/reports/json/json-'+name2+'.json',
            'emitErrors': false
        }));
});

gulp.task('reportHtml', function () {
    var options = {
        theme: 'bootstrap',
        jsonFile: 'test/reports/json/json-'+name+'.json',
        output: 'test/reports/html/html-'+name+'.html',
        reportSuiteAsScenarios: true,
        launchReport: false
    };
    var options2 = {
        theme: 'bootstrap',
        jsonFile: 'test/reports/json/json-'+name2+'.json',
        output: 'test/reports/html/html-'+name2+'.html',
        reportSuiteAsScenarios: true,
        launchReport: false
    };
    reporter.generate(options);
    reporter.generate(options2);
    return server.stop();
});
