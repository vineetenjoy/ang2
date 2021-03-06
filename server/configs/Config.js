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
	me: 'https://localhost:9090',
	redirectPrefix: '<!doctype html><html><head><script>window.location = "',
	redirectSuffix: '"</script></head><body>hi2</body></html>',
	paymentGateway: {
		curl: '',
		key: 'BxGvnf',
		url: 'https://test.payu.in/_payment',
		furl: 'http://localhost:9090/benow/paymentfailure',
		surl: 'http://localhost:9090/benow/paymentsuccess'
	},
	beNowSvc: {
		host: '52.7.181.77',
        port: '8080',
	},
    env:'dev' // When doing development
	//env:'prod''
};

config.port = config.env == 'prod' ? 9090 : 9090;
module.exports = config;
