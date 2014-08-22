var express = require('express');
var cg = require('./cg');
var router = express.Router();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var imageschema = new Schema({
    Name :String,
    DatePic:Number
});

var db;
var imageModel;
cg.getMongoCon(function (conn) {
    db = conn;
    imageModel = db.model('image', imageschema);
});

router.get('/', function(req, res) {
        var data = {};
        data.Name = "Worawut Boontan"
        data.DatePic = Number(new Date());

        var p = new imageModel(data);
        p.save(function (err) {
            if (err) {
                res.render('index', {title: 'HayharPic', layout: 'partial/shared' , data : err});
            } else {
                res.render('index', {title: 'HayharPic', layout: 'partial/shared' , data : p});
            }

        })

});

module.exports = router;