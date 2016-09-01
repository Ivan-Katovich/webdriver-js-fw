'use strict';

var glob = require('glob-promise'),
    q = require('q'),
    fsp = require('fs-promise');

var helper = {
    glueJsonReports: function(path){
        var objects = [];
        return glob(path)
            .then(function (files) {
                var rootPromises = [];
                var f1 = function(file){
                    return fsp.readJson(file)
                        .then(function (arr) {
                            var promises = [];
                            var f2 = function(a){
                                return q.fcall(function(){
                                    return objects.push(a);
                                });
                            };
                            var id = file.match(/id\d{3}.+\.json$/g)[0].split('.')[0];
                            for (var i = 0; i < arr.length; i++) {
                                arr[i].name += ' |'+id+'| ';
                                arr[i].id += ' |'+id+'| ';
                                promises.push(f2(arr[i]));
                            }
                            return q.all(promises);
                        })
                };
                for (var i = 0; i < files.length; i++) {
                    rootPromises.push(f1(files[i]))
                }
                return q.all(rootPromises);
            })
            .then(function () {
                return fsp.writeJson(process.cwd()+'\\test\\reports\\json\\result-json-cucumber-report.json',objects);
            })
            .catch(function(err){
                console.error('Glue JSON error: '+err);
            });
    },

    asyncLoop: function (length, func) {
        var deferred = q.defer();
        var i = 0,
            loop = function () {
                if (i++ === length) {
                    deferred.resolve();
                    return deferred.promise;
                }
                return func(loop, i);
            };
        return loop();
    }

};

module.exports = helper;