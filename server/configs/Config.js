// Config class.
var config = {
    mongoConfig:{
		'projectUrl':'',
		'userCollectionName':'',
	},
	logger : {
		logDir : __dirname + '/server/log/',
		logFileName : __dirname + '/server/log/app.log'
	},
	emailSettings:{
		userid: '',
		password: '',
		server: '',
		subject: '',
		fromEmail: ''
	}/*,
	ssl: {
		active: true,
		key: 'server.key',
		certificate: 'server.cert',
	}*/,//For Prod.
	ssl: {
		active: false,
		key: '',
		certificate: '',
	},//For dev.
	me: ' https://citizensportal.benow.in/powaifest17',
	paymentGateway: {
		curl: '',
		key: 'BxGvnf',
		url: 'https://test.payu.in/_payment',
		furl: ' https://citizensportal.benow.in/paymentfailure',
		surl: ' https://citizensportal.benow.in/paymentsuccess'
	},
	beNowSvc: {
		host: '52.7.181.77',
        port: '8080',
	},
    env:'dev' // When doing development
	//env:'prod''
};

config.port = config.env == 'prod' ? 4001 : 4001;
module.exports = config;
