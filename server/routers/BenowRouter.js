// Library inclusions.
var express = require('express');

// Class inclusions.
var urls = require('./../utils/URLs'); 
var beNowController = require('./../controllers/BeNowController');

// Initializations.
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    return next();
/*    if (req.isAuthenticated()){
        return next();
    }
    res.redirect(urls.home);*/
}

var resAuthenticated = function (req, res, next) {    
    return next();
/*    if (req.isAuthenticated()){
        return next();
    }
    res.json({'status':0,'message':'session expired.','errorType':'1'});*/
};

router.post('/processPayment', isAuthenticated, beNowController.processPayment.bind(beNowController));

router.isAuthenticated = isAuthenticated;
router.resAuthenticated = resAuthenticated;
module.exports = router;