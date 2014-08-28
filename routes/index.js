var express = require('express');
var cg = require('./cg');
var router = express.Router();

var fs = require('fs');
var gm = require('gm');


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var imageschema = new Schema({
    Name :String,
    Fdata : Buffer,
    Tdata : Buffer,
    MimeType : String,
    DatePic:Number
});

var db;
var imageModel;
cg.getMongoCon(function (conn) {
    db = conn;
    imageModel = db.model('image', imageschema);
});

router.get('/', function(req, res) {
        res.render('index', {title: 'HayharPic', layout: 'partial/shared'});

});

function resize(imagepath,cb) {
    gm(imagepath).resize(800, 800)
        .quality(100)
        .autoOrient()
        .write(imagepath, function (err) {
            if (!err) {
                cb(imagepath);
            }
            else {
                cb("ERROR");
            }
        });
}

function savefile(filepath,type,cb){
    fs.readFile(filepath, function read(err, readdata) {
        if (err) {
            res.send("ERROR");
        }
        var data = {};
        data.Name = "Worawut Boontan";
        data.DatePic = Number(new Date());
        data.MimeType = type;
        data.Fdata = readdata;

        gm(filepath).resize(250, 250)
            .quality(100)
            .autoOrient()
            .write(filepath, function (err) {
                if (!err) {
                    var fsData = fs.readFileSync(filepath);
                    data.Tdata = fsData;
                    var p = new imageModel(data);
                    p.save(function (err) {
                        if (err) {
                            cb('ERROR');
                        } else {
                            cb({id: p._id, mimetype: p.MimeType});
                        }
                    });
                }
                else {
                    cb("ERROR");
                }
            });
        setTimeout(function() {
            fs.unlinkSync(filepath);
        },1000);
    });
}

router.post('/upload',function(req,res){

    gm(req.files.file.path).size(function(err, value){
        if(value) {
            if (value.width > 800 || value.height > 800) {
                resize(req.files.file.path, function (status1) {
                    if (status1 == "ERROR")
                        res.send(status1);
                    else
                        savefile(req.files.file.path,req.files.file.mimetype, function (status2) {
                            res.send(status2)
                        });
                })
            } else {
                savefile(req.files.file.path,req.files.file.mimetype, function (status2) {
                    res.send(status2)
                });
            }
        }
        else
        {
            fs.unlinkSync(req.files.file.path);
            res.send("ERROR");
        }

    })
});

router.get('/original/:id',function(req,res){

    console.log(req.params.id);
    imageModel.findOne({ _id: req.params.id }, function (err, imageData) {
        if (!err) {
            res.writeHead(200, {'Content-Type': imageData.MimeType });
            res.end(imageData.Fdata, 'binary');
        } else {
            res.writeHead(200, {'Content-Type': 'text/plain' });
            res.end('Not Found Picture \n');
        }
    });
});

router.get('/trumbnail/:id',function(req,res){
    imageModel.findOne({ _id: req.params.id }, function (err, imageData) {
        if (!err) {
            res.writeHead(200, {'Content-Type': imageData.MimeType });
            res.end(imageData.Tdata, 'binary');
        } else {
            res.writeHead(200, {'Content-Type': 'text/plain' });
            res.end('Not Found Picture \n');
        }
    });
});



module.exports = router;
