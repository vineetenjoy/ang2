var http = require('http');
var crypto = require('crypto');
var uuid = require('node-uuid');
var request = require('request');

var  config = require('./../configs/Config');

var benowCont = {
    postAndCallback: function(extServerOptions, obj, cb) {
        var reqPost = http.request(extServerOptions, function (res) {
            var buffer = ""; 
            res.on('data', function (chunk) {
                buffer += chunk;
            });
            res.on('end', function (err) {
                cb(JSON.parse(buffer));
            }); 
        });

        reqPost.write(JSON.stringify(obj));
        reqPost.end();
        reqPost.on('error', function(e) {
            cb(e);
        });
    },

    getExtServerOptions: function(path, headers) {
        var extServerOptions = {
            host: config.beNowSvc.host,
            port: config.beNowSvc.port,
            path: path,
            method: 'POST',
            headers: {}
        };

        if(headers['content-type'])
            extServerOptions.headers['Content-Type'] = headers['content-type'];
        else if(headers['Content-Type'])
            extServerOptions.headers['Content-Type'] = headers['Content-Type'];
        else
            extServerOptions.headers['Content-Type'] = 'application/json';

        if(headers['X-AUTHORIZATION'])
            extServerOptions.headers['X-AUTHORIZATION'] = headers['X-AUTHORIZATION'];
        else if(headers['x-authorization'])
            extServerOptions.headers['X-AUTHORIZATION'] = headers['x-authorization'];

        return extServerOptions;
    },

    pFRegDetails: function(req, res) {
        this.pFRegDetailsPost(req, function(data) {
            res.json(data);
        });
    },

    numAvailableSeats: function(req, res) {
        this.numAvailableSeatsPost(req, function(data) {
            res.json(data);
        });
    },

    registerInPF: function(req, res) {
        this.registerInPFPost(req, function(data) {
            res.json(data);
        });
    },

    searchMerchants: function(req, res) {
        this.searchMerchantsPost(req, function(data) {
            res.json(data);
        });
    },

    listMerchants: function(req, res) {
        this.listMerchantsPost(req, function(data) {
            res.json(data);
        });
    },

    signUp: function(req, res) {
        this.signUpPost(req, function(data) {
            res.json(data);
        });
    },

    sendOTP: function(req, res) {
        this.sendOTPPost(req, function(data) {
            res.json(data);
        });
    },

    paymentCallback: function(req, res) {
        this.paymentCallbackPost(req, function(data) {
            res.json(data);
        });
    },

    initiatePayment: function(req, res) {
        this.initiatePaymentPost(req, function(data) {
            res.json(data);
        });
    },

    hashPayload: function(req, res) {
        this.hashPayloadPost(req, function(data) {
            res.json(data);
        });
    },

    validateUser: function(req, res) {
        this.validateUserPost(req, function(data) {
            res.json(data);
        });
    },

    validateUserPost: function(req, cb) {
        try {
            this.postAndCallback(this.getExtServerOptions('/payments/registration/getUserWebBasicInformation', req.headers), 
                {
                    "username": req.body.username
                }, 
                cb);
        }
        catch(err) {
            cb(err);
        }
    },

    hashPayloadPost: function(req, cb) {
        try {
            this.postAndCallback(this.getExtServerOptions('/payments/paymentadapter/getWebCalculatedHash', req.headers), 
                {
                    "amount": req.body.amount,
                    "email": req.body.email,
                    "firstName": req.body.firstName,
                    "furl": req.body.furl,
                    "merchantKey": req.body.merchantKey,
                    "productInfo": req.body.productInfo,
                    "surl": req.body.surl,
                    "transactionNumber": req.body.transactionNumber,
                    "udf1": req.body.udf1,
                    "udf2": req.body.udf2,
                    "udf3": req.body.udf3,
                    "udf4": req.body.udf4,
                    "udf5": req.body.udf5,
                    "username": req.body.username
                }, 
                cb);
        }
        catch(err) {
            cb(err);
        }
    },


    paymentCallbackPost: function(req, cb) {
        try {
            this.postAndCallback(this.getExtServerOptions('payments/paymentadapter/payWebRequest', req.headers),
                {
                    "amount": req.body.amount,
                    "hdrTransRefNumber": req.body.hdrTransRefNumber,
                    "listPayments": [
                        {
                            "paymentDetails": {
                                "deviceDetails": {
                                    "applicationName": req.body.listPayments[0].paymentDetails.deviceDetails.applicationName,
                                    "deviceId": req.body.listPayments[0].paymentDetails.deviceDetails.deviceId,
                                    "mobileNumber": req.body.listPayments[0].paymentDetails.deviceDetails.mobileNumber
                                },
                                "merchantCode": req.body.listPayments[0].paymentDetails.merchantCode,
                                "merchantName": req.body.listPayments[0].paymentDetails.merchantName,
                                "payeeVirtualAddress": req.body.listPayments[0].paymentDetails.payeeVirtualAddress,
                                "payerUsername": req.body.listPayments[0].paymentDetails.payerUsername,
                                "paymentInvoice": {
                                    "amountPayable": req.body.listPayments[0].paymentDetails.paymentInvoice.amountPayable
                                },
                                "remarks": req.body.listPayments[0].paymentDetails.remarks,
                                "thirdPartyTransactionResponseVO": {
                                    "referanceNumber": req.body.listPayments[0].paymentDetails.thirdPartyTransactionResponseVO.referanceNumber,
                                    "response": req.body.listPayments[0].paymentDetails.thirdPartyTransactionResponseVO.response
                                },
                                "txnId": req.body.listPayments[0].paymentDetails.txnId
                            },
                            "paymentMethodType": req.body.listPayments[0].paymentMethodType,
                            "paymentTransactionStatus": {
                                "transactionStatus": req.body.listPayments[0].transactionStatus
                            }
                        }
                    ]
                },
                cb);
        }
        catch(err) {
            cb(err);
        }
    },

    initiatePaymentPost: function(req, cb) {
        try {
            this.postAndCallback(this.getExtServerOptions('/payments/paymentadapter/initiatePayWebRequest', req.headers),
                {
                    "amount": req.body.amount,
                    "hdrTransRefNumber": req.body.hdrTransRefNumber,
                    "listPayments": [
                        {
                            "paymentDetails": {
                                "deviceDetails": {
                                    "applicationName": req.body.listPayments[0].paymentDetails.deviceDetails.applicationName,
                                    "deviceId": req.body.listPayments[0].paymentDetails.deviceDetails.deviceId,
                                    "mobileNumber": req.body.listPayments[0].paymentDetails.deviceDetails.mobileNumber
                                },
                                "merchantCode": req.body.listPayments[0].paymentDetails.merchantCode,
                                "merchantName": req.body.listPayments[0].paymentDetails.merchantName,
                                "payeeVirtualAddress": req.body.listPayments[0].paymentDetails.payeeVirtualAddress,
                                "payerUsername": req.body.listPayments[0].paymentDetails.payerUsername,
                                "paymentInvoice": {
                                    "amountPayable": req.body.listPayments[0].paymentDetails.paymentInvoice.amountPayable
                                },
                                "remarks": req.body.listPayments[0].paymentDetails.remarks
                            },
                            "paymentMethodType": req.body.listPayments[0].paymentMethodType
                        }
                    ]
                },
                cb);
        }
        catch(err) {
            cb(err);
        }
    },

    pFRegDetailsPost: function(req, cb) {
        try {
            this.postAndCallback(this.getExtServerOptions('/payments/registration/checWebkUserRegForEvent', req.headers), 
                { 
                    "username": req.body.username, 
                    "eventId": req.body.eventId 
                }, 
                cb);
        }
        catch(err) {
            cb(err);
        }
    },

    numAvailableSeatsPost: function(req, cb) {
        try {
            this.postAndCallback(this.getExtServerOptions('/payments/registration/fecthWebNoOfAvailableSeats', req.headers), 
                { "eventId": req.body.eventId }, 
                cb);
        }
        catch(err) {
            cb(err);
        }
    },

    registerInPFPost: function(req, cb) {
        try {
            this.postAndCallback(this.getExtServerOptions('/payments/registration/updateWebUserEventDtl', req.headers), 
                {
                    "username": req.body.username,
                    "email": req.body.email,
                    "address": req.body.address,
                    "eventId": req.body.eventId,
                    "noOfSeats": req.body.noOfSeats
                }, 
                cb);
        }
        catch(err) {
            cb(err);
        }
    },

    searchMerchantsPost: function(req, cb) {
        try {
            this.postAndCallback(this.getExtServerOptions('/payments/merchantpayment/searchWebMerchants', req.headers), 
                {
                    "emailAddress": req.body.emailAddress,
                    "lattitude": req.body.lattitude,
                    "longitude": req.body.longitude,
                    "pageNumber": req.body.pageNumber,
                    "sortingOrder": req.body.sortingOrder,
                    "searchParam": req.body.searchParam
                }, 
                cb);
        }
        catch(err) {
            cb(err);
        }
    },

    listMerchantsPost: function(req, cb) {
        try {
            this.postAndCallback(this.getExtServerOptions('/payments/merchantpayment/listWebMerchants', req.headers), 
                {
                    "emailAddress": req.body.emailAddress,
                    "lattitude": req.body.lattitude,
                    "longitude": req.body.longitude,
                    "pageNumber": req.body.pageNumber,
                    "sortingOrder": req.body.sortingOrder
                }, 
                cb);
        }
        catch(err) {
            cb(err);
        }
    },

    signUpPost: function(req, cb) {
        try {
            if(!req || !req.body || !req.body.appUserReg || !req.body.registrationOTP) {
                cb({
                    "status": "Failed",
                    "refNumber": null,
                    "validationErrors": {
                    "Otp": "Otp is not matched."
                }});
            }
            else {
                this.postAndCallback(this.getExtServerOptions('/payments/registration/registerWebBenowUser', req.headers), 
                    {
                        "appUserReg" : {
                            "username" : req.body.appUserReg.username, 
                            "fullName" : req.body.appUserReg.fullName, 
                            "mobileNumber" : req.body.appUserReg.mobileNumber
                        },
                        "registrationOTP" : {
                            "mobileNumber" : req.body.registrationOTP.mobileNumber , 
                            "otp" : req.body.registrationOTP.otp 
                        }
                    }, 
                    cb);
            }
        }
        catch(err) {
            cb(err);
        }
    },

    sendOTPPost: function(req, cb) {
        try {
            this.postAndCallback(this.getExtServerOptions('/payments/registration/sendWebOTP', req.headers), 
                {
                    "mobileNumber": req.body.mobileNumber
                }, 
                cb);
        }
        catch(err) {
            cb(err);
        }
    },

	processPayment:function(req,res) {
        try {
            var url = config.paymentGateway.url;
            var key = config.paymentGateway.key;
            var curl = config.paymentGateway.curl;
            var salt = config.paymentGateway.salt;
            var surl = config.paymentGateway.surl;
            var furl = config.paymentGateway.furl;

            var cat = req.body.paytype;
            var drop_cat = 'DC,NB,EMI,CASH';
            if(cat > 1)
                drop_cat = 'CC,NB,EMI,CASH';

            var payload = {};
            payload.key = key;
            payload.curl = curl;
            payload.surl = surl;
            payload.furl = furl;
            payload.ismobileview = 1;
            payload.txnid = uuid.v4();
            payload.drop_category = drop_cat;
            payload.phone = req.body.phone;
            payload.amount = req.body.payamount;
            payload.lastname = req.body.lastname;
            payload.firstname = req.body.firstname;
            payload.productinfo = req.body.productinfo;
            payload.email = req.body.email ? req.body.email : req.body.phone;

            var text = payload.key + "|" + payload.txnid + "|" + payload.amount + "|" + payload.productinfo + "|" + 
                payload.firstname + "|" + payload.email + "|||||||||||" + salt;
            var hash = crypto.createHash('sha512');
            hash.update(text);
            payload.hash = hash.digest('hex');
            
            request.post({ url: url, form: payload}, function(err, remoteResponse, remoteBody) {
                if (err)
                    return res.status(500).end('Error'); 

                res.redirect(remoteResponse.caseless.dict.location);
            });
        }
        catch(err) { }
	}
}

module.exports = benowCont;