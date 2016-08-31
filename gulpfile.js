
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
    q = require('q'),
    util = require('gulp-util'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    server,
    name = '';

chai.use(chaiAsPromised);

expect = chai.expect;

var exec = require('child-process-promise').exec;


gulp.task('test', function(){
    runSequence('server',
        'onPrepare',
        'cucumber',
        'reportHtml',
        'serverStop');
});

gulp.task('parallel', function(){
    runSequence('server',
        'onPrepare',
        'cmd',
        'serverStop');
});

gulp.task('cmd', function(){

    var threads = util.env.threads ? util.env.threads : 3,
        browsersStr = util.env.browsers ? util.env.browsers : 'chrome/chrome/chrome',
        viewsStr = util.env.views ? util.env.views : 'desktop/desktop/desktop',
        promises = [],
        browsers = browsersStr.split('/'),
        views = viewsStr.split('/');

    var f1 = function(browser,view){
        return exec('gulp cucumberWithReport --browser='+browser+' --view='+view)
            .then(function (results) {
                console.log(results.stdout);
            })
            .catch(function (err) {
                console.error('ERROR: ', err);
            });
    };

    for( var i = 0; i<threads; i++){
        if(!browsers[i]){
            browsers[i] = 'chrome';
        }
        if(!views[i]){
            views[i] = 'desktop';
        }
        promises.push(f1(browsers[i],views[i]));
    }

    console.log('\nTests has run in '+threads+' threads, with: ');
    console.log('browsers: '+browsers.toString());
    console.log('views: '+views.toString()+'\n');

    return q.all(promises);

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
        });
});

gulp.task('cucumber', function() {
    util.env.browser ? process.env.BROWSER = util.env.browser : process.env.BROWSER = 'chrome';
    util.env.view ? process.env.VIEW = util.env.view : process.env.VIEW = 'desktop';
    console.log('\n Tests are raning on "'+process.env.BROWSER+'" browser, "'+process.env.VIEW+'" view has setup\n');
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

gulp.task('reportHtml', function () {
    var options = {
        theme: 'bootstrap',
        jsonFile: 'test/reports/json/json-'+name+'.json',
        output: 'test/reports/html/html-'+name+'.html',
        reportSuiteAsScenarios: true,
        launchReport: false
    };
    reporter.generate(options);
});

gulp.task('cucumberWithReport', ['cucumber'], function () {
    var options = {
        theme: 'bootstrap',
        jsonFile: 'test/reports/json/json-'+name+'.json',
        output: 'test/reports/html/html-'+name+'.html',
        reportSuiteAsScenarios: true,
        launchReport: false
    };
    return reporter.generate(options);
});

gulp.task('serverStop', function(){
    return server.stop();
});
