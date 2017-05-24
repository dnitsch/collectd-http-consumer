// var express = require('express');
var router = require('express').Router();
var model = require('../model/model');
var service = require('../service/service');

/// version 2
/// bulk parsing
router.post('/', function (req, res) {

    var mdl = new model();
    var srv = new service();
    var response = {};

        var _object = null;

        var _object = mdl.parse_bulk(req.body);

        srv.bulk(_object, (e, d) => {
            if (e) {
                
                    response.OK = false;
                    response.Message = "error";
                    response.ResponseData += JSON.stringify(e);
                    res.statusCode = 500;
                    res.send(response);
                    res.end()
                
            } else {
                if (d.errors) {

                } else {
                    res.statusCode = 201;
                    res.send({
                        OK: true,
                        Message: "success",
                        ResponseData: {
                            itemsIndexed: d.items.length,
                            time: "" + d.took +"ms"
                        }
                    });
                    res.end()
                }
                    
                   
                }
        });
});


router.delete('/:index', function (req, res) {

   // var mdl = new model();
    var srv = new service();

    var _object = req.params.index.split(',');

         srv.deleteIndices(_object, (e, d) => {
             if (e) {
                 initCounter += 1;
                 res.statusCode = 500;
                 res.send({
                     OK: false,
                     Message: "error",
                     ResponseData: e
                 });
                 res.end()
             } else {
                 res.statusCode = 202;
                 res.send({
                     OK: true,
                     Message: "success",
                     ResponseData: d
                 });
                 res.end();
             }
        });
});


router.post('/template/:indexPattern', function (req, res) {

    var mdl = new model();
    var srv = new service();

    // do the work here


    var _object = mdl.mappingCollectdTemplate(req.params.indexPattern);

    srv.template(_object, (e, d) => {
        if (e) {
            res.statusCode = 500;
            res.send({
                OK: false,
                Message: "error",
                ResponseData: e
            });
            res.end()
        } else {
            res.statusCode = 201;
            res.send({
                OK: true,
                Message: "success",
                ResponseData: d
            });
            res.end();
        }
    });
});

module.exports = router;


//router.post('/', function (req, res) {

//    var mdl = new model();
//    var srv = new service();
//    var response = {};
//    // do the work here
//    var initCounter = 0;
//    var length = req.body.length;

//    //console.log(JSON.stringify(req.body));
//    // if (req.query.bulk) {
//    var _object = null;

//    var _object = mdl.parse_bulk(req.body);

//    srv.bulk(_object, (e, d) => {
//        if (e) {

//            response.OK = false;
//            response.Message = "error";
//            response.ResponseData += JSON.stringify(e);
//            res.statusCode = 500;
//            res.send(response);
//            res.end()

//        } else {

//            res.statusCode = 201;
//            res.send({
//                OK: true,
//                Message: "success",
//                ResponseData: {
//                    index: d._index,
//                    created: d.created
//                }
//            });
//            res.end()
//        }
//    });
//    //}
//    //else {
//    //    req.body.forEach((record) => {

//    //        var _object = null;

//    //        var _object = mdl.parse_v1(record);

//    //        srv.index(_object, (e, d) => {
//    //            if (e) {

//    //                initCounter += 1;
//    //                if (initCounter == length) {

//    //                    response.OK = false;
//    //                    response.Message = "error";
//    //                    response.ResponseData += JSON.stringify(e);

//    //                    res.statusCode = 500;

//    //                    res.send(response);

//    //                    res.end()

//    //                }
//    //                else {
//    //                    response.ResponseData += JSON.stringify(e);
//    //                }
//    //            } else {
//    //                initCounter += 1;

//    //                if (initCounter == length) {

//    //                    res.statusCode = 201;
//    //                    res.send({
//    //                        OK: true,
//    //                        Message: "success",
//    //                        ResponseData: {
//    //                            index: d._index,
//    //                            created: d.created
//    //                        }
//    //                    });
//    //                    res.end()
//    //                } else {
//    //                    //console.log("keep looping");
//    //                }
//    //            }
//    //        });
//    //    });

//});
