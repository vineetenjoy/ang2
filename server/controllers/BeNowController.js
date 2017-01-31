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
                if(res.statusCode === 200) 
                    cb(JSON.parse(buffer));
                else
                    cb({'success': false, 'status': res.statusCode});
            });
        });

        reqPost.write(JSON.stringify(obj));
        reqPost.end();
        reqPost.on('error', function(e) {
            cb({'error': e, 'success': false});
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
/*        this.initiatePaymentPost(req, function(data) {
            res.json(data);
        });*/
    },

    hashPayload: function(req, res) {
/*        this.hashPayloadPost(req, function(data) {
            res.json(data);
        });*/
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

    hashPayloadPost: function(obj, headers, payload, cb1, cb2, rd) {
        try {
            cb2(cb1('/payments/paymentadapter/getWebCalculatedHash', headers), obj,
                function(data) {
                    if(data && data.hash) {
                        var hp = JSON.parse(data.hash);
                        payload.hash = hp.payment_hash;            
                        request.post({ url: config.paymentGateway.url, form: payload}, 
                            function(err, remoteResponse, remoteBody) {
                                if (err) {
                                    //REDIRECT TO PAYMENT FAILURE.
                                }

                                rd.redirect(remoteResponse.caseless.dict.location);
                            });
                    }
                    else {
                        //REDIRECT TO PAYMENT FAILURE.
                    }

                });
        }
        catch(err) {
            //REDIRECT TO PAYMENT FAILURE.
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

    initiatePaymentPost: function(obj, headers, payload, cb, cb1, cb2, rd) {
        try {
            this.postAndCallback(this.getExtServerOptions('/payments/paymentadapter/initiatePayWebRequest', headers), obj, 
                function(data) {
                    //2. Create Hash.
                    if(data && data.hdrTransRefNumber) {
                        payload.txnid = data.hdrTransRefNumber;
                        var obj2 = {
                            "amount": obj.amount,
                            "email": payload.email,
                            "firstName": payload.firstname,
                            "furl": payload.furl,
                            "merchantKey": payload.key,
                            "productInfo": payload.productinfo,
                            "surl": payload.surl,
                            "transactionNumber": data.hdrTransRefNumber,
                            "udf1": "",
                            "udf2": "",
                            "udf3": "",
                            "udf4": "",
                            "udf5": "",
                            "username": payload.phone
                        };
                        cb(obj2, headers, payload, cb1, cb2, rd);
                    }
                    else {
                        //REDIRECT TO FAILURE PAYMENT.
                    }

                });
        }
        catch(err) {
            //REDIRECT TO PAYMENT FAILURE.
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

	processPayment:function(req, res) {
        try {
        //1. initiate web payment
            var obj = {
                "amount": req.body.payamount,
                "hdrTransRefNumber": "",
                "listPayments": [
                    {
                        "paymentDetails": {
                            "deviceDetails": {
                                "applicationName": "web",
                                "deviceId": "browser",
                                "mobileNumber": req.body.phone
                            },
                            "merchantCode": req.body.merchantcode,
                            "merchantName": req.body.merchantname,
                            "payeeVirtualAddress": "",//What is this?
                            "payerUsername": req.body.phone,
                            "paymentInvoice": {
                                "amountPayable": req.body.payamount
                            },
                            "remarks": ""//What should go here?
                        },
                        "paymentMethodType": req.body.paytype === 1 ? 'CREDIT_CARD' : 'DEBIT_CARD'
                    }
                ]
            };

            var cat = req.body.paytype;
            var drop_cat = 'DC,NB,EMI,CASH';
            if(cat > 1)
                drop_cat = 'CC,NB,EMI,CASH';

            var payload = {
                "key": config.paymentGateway.key,
                "curl": config.paymentGateway.curl,
                "surl": config.paymentGateway.surl,
                "furl": config.paymentGateway.furl,
                "ismobileview": 1,
                "txnid": "",
                "drop_category": drop_cat,
                "phone": req.body.phone,
                "amount": req.body.payamount,
                "lastname": req.body.lastname,
                "firstname": req.body.firstname,
                "productinfo": req.body.productinfo,
                "email": req.body.email ? req.body.email : ""
            };

            var headers = {
                'X-AUTHORIZATION': req.body.xauth,
                'Content-Type': 'application/json'
            }

            this.initiatePaymentPost(obj, headers, payload, this.hashPayloadPost, 
                this.getExtServerOptions, this.postAndCallback, res);
        }
        catch(err) { 
            //REDIRECT TO PAYMENT FAILURE
        }
	}
}

module.exports = benowCont;