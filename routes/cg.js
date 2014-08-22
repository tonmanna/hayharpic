var spawn = require('child_process').spawn;
var mongoose = require('mongoose');
var fs = require('fs');
var params = {};
//params.mongodb = "mongodb://192.168.1.89:27017/server";
params.mongodb = "mongodb://localhost:27017/hayharpic";

params.getMongoCon = function (cb) {
    var db = mongoose.createConnection(params.mongodb);
    cb(db);
}

params.spawnargs=function(prc,cb){
    prc.stdout.setEncoding('utf8');
    prc.stdout.on('data', function (data) {
        var str = data.toString();
        var lines = str.split(/(\r?\n)/g);
        console.log(lines.join(""));
    });

    prc.on('close', function (code) {
        console.log('process exit code ' + code);
        if(code==0) {
            cb("END");
        }else {
            cb("ERROR");
        }
    });
}

module.exports = params;