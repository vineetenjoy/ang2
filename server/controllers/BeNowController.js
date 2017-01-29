var crypto = require('crypto');
var uuid = require('node-uuid');
var request = require('request');

var  config = require('./../configs/Config');

var benowCont = {
	processPayment:function(req,res){
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
}

module.exports = benowCont;