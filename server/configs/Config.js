// Config class.
var config = {
    mongoConfig:{
		'projectUrl':'',
		'userCollectionName':'',
	},
	logger : {
		logDir : __dirname + '/../server/log/',
		logFileName : __dirname + '/../server/log/app.log'
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
    env:'dev' // When doing development
	//env:'prod''
};

config.port = config.env == 'prod' ? 9090 : 9090;
module.exports = config;
