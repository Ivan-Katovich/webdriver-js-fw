
require('chromedriver');
require('geckodriver'); //have to extract geckodriver.exe from zip file manually (node-geckodriver issue)
require('phantomjs');
require('browsermob-proxy');

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    Proxy = require('browsermob-proxy').Proxy,
    jsonFormatter = require('format-json'),
    cucumber = require('gulp-cucumber'),
    selenium = require('selenium-standalone'),
    SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
    reporter = require('cucumber-html-reporter'),
    fsp = require('fs-promise'),
    fs = require('fs'),
    q = require('q'),
    util = require('gulp-util'),
    chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    helper = require('./test/support/helper.js'),
    server,
    name = '',
    proxy;

chai.use(chaiAsPromised);

expect = chai.expect;

var exec = require('child-process-promise').exec;


gulp.task('test', function(){
    runSequence(
        'server',
        'proxy',
        'onPrepare',
        'cucumber',
        'stopProxy',
        'reportHtml',
        'serverStop'
    );
});

gulp.task('parallel', function(){
    runSequence(
        'server',
        'onPrepare',
        'cmd',
        'glueJsons',
        'resultReportHtml',
        'serverStop'
    );
});

gulp.task('cmd', function(){

    var threads = util.env.threads ? util.env.threads : 3,
        browsersStr = util.env.browsers ? util.env.browsers : 'chrome/chrome/chrome',
        viewsStr = util.env.views ? util.env.views : 'desktop/desktop/desktop',
        promises = [],
        browsers = browsersStr.split('/'),
        views = viewsStr.split('/'),
        browsersFinal = [],
        viewsFinal = [];

    var f1 = function(browser,view){
        return exec('gulp cucumber --browser='+browser+' --view='+view)
            .then(function (results) {
                console.log(results.stdout);
            })
            .catch(function (err) {
                console.error('ERROR: ', err);
            });
    };

    for( var i = 0; i<threads; i++){
        if(browsers[i] !== 'firefox' && browsers[i] !== 'phantomjs'){
            browsers[i] = 'chrome';
        }
        browsersFinal.push(browsers[i]);
        if(views[i] !== 'mobile' && views[i] !== 'tabletL' && views[i] !== 'tabletP'){
            views[i] = 'desktop';
        }
        viewsFinal.push(views[i]);
        promises.push(f1(browsers[i],views[i]));
    }

    console.log('\nTests has run in '+threads+' threads, with: ');
    console.log('browsers: '+browsersFinal.toString());
    console.log('views: '+viewsFinal.toString()+'\n');

    return q.all(promises);

});

gulp.task('server', function(){
    var pathToSeleniumJar = require('path').join(__dirname, 'selenium-server', 'selenium-server-standalone-3.0.0-beta2.jar');
    server = new SeleniumServer(pathToSeleniumJar, {port: 4444});
    return server.start();
});

gulp.task('proxy', function(callback){
    proxy = new Proxy({ /*selHost: 'localhost', selPort: 4444,*/ host: 'localhost', port: 8080 });
    proxy.start(8081,function(err){
        if(err){
            console.log('proxy start ERROR: '+err);
            callback();
        }else{
            proxy.startHAR(8081,function(err){
                if (err) {
                    console.error('startHAR ERROR: ' + err);
                    callback();
                } else {
                    callback();
                }
            });
        }
    });

});

gulp.task('stopProxy', function(callback){
    proxy.getHAR(8081,function(err,data){
        if(err){
            console.log('getHAR ERROR: '+err);
            callback();
        }else{
            var dataObj = JSON.parse(data);
            var path = 'test/reports/har/';
            var bmrName = 'proxy-id'+ Math.floor((Math.random() * 900) + 100) +'.json';
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
            console.log('Generate proxy report: '+path+bmrName);
            fsp.writeJson(path+bmrName, dataObj)
                .then(function () {
                    return proxy.stop(8081,function(){
                        callback();
                    });
                },function(err){
                    callback(err);
                });
            // fs.writeFileSync(path+'proxy-id'+ Math.floor((Math.random() * 900) + 100) +'.har', data, 'utf8');
            // proxy.stop(8081,function(){
            //     callback();
            // });
        }
    })
});

gulp.task('onPrepare', function(){
    return fsp.emptyDir('test/reports/json')
        .then(function () {
            return fsp.emptyDir('test/reports/html');
        })
        .then(function () {
            return fsp.emptyDir('test/reports/har');
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

gulp.task('resultReportHtml', function () {
    var options = {
        theme: 'bootstrap',
        jsonFile: 'test/reports/json/result-json-cucumber-report.json',
        output: 'test/reports/html/result-html-cucumber-report.html',
        reportSuiteAsScenarios: true,
        launchReport: false
    };
    return reporter.generate(options);
});

gulp.task('glueJsons', function(){
    return helper.glueJsonReports(process.cwd()+'\\test\\reports\\json\\*.json');
});

gulp.task('serverStop', function(){
    return server.stop();
});
