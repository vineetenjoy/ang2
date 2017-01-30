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
router.post('/sendOTP', isAuthenticated, beNowController.sendOTP.bind(beNowController));
router.post('/signUp', isAuthenticated, beNowController.signUp.bind(beNowController));
router.post('/listMerchants', isAuthenticated, beNowController.listMerchants.bind(beNowController));
router.post('/searchMerchants', isAuthenticated, beNowController.searchMerchants.bind(beNowController));
router.post('/pFRegDetails', isAuthenticated, beNowController.pFRegDetails.bind(beNowController));
router.post('/numAvailableSeats', isAuthenticated, beNowController.numAvailableSeats.bind(beNowController));
router.post('/registerInPF', isAuthenticated, beNowController.registerInPF.bind(beNowController));
router.post('/validateUser', isAuthenticated, beNowController.validateUser.bind(beNowController));
/*router.post('/initiatePayment', isAuthenticated, beNowController.registerInPF.bind(beNowController));*/
/*router.post('/paymentCallback', isAuthenticated, beNowController.paymentCallback.bind(beNowController));*/
/*router.post('/hashPayload', isAuthenticated, beNowController.hashPayload.bind(beNowController));*/

router.isAuthenticated = isAuthenticated;
router.resAuthenticated = resAuthenticated;
module.exports = router;