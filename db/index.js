var Sequelize = require('sequelize');

const config = require('./config'),
	UserModel = require('../models/user'),
	ProblemModel = require('../models/problem'),
	SubmissionModel = require('../models/submission');

var connected = false;

const sequelize = new Sequelize(config.options.database, config.authentication.options.userName, 
	config.authentication.options.password, {
	host: config.server,
	dialect: 'mssql',
	dialectOptions: {
		options: {
			encrypt: config.options.encrypt
		}
	}
});

sequelize.sync().then(); // may switch to db migration for production

module.exports = {
	init: () => {
		sequelize.authenticate().then(() => {
    		console.log('Successfully established conncection to Azure SQL Server');
    		connected = true;
		}).catch(err => {
    		console.error('Unable to connect to the database:', err);
		});
	},
	connected: () => {
		return connected;
	},
	User: UserModel(sequelize, Sequelize),
	Problem: ProblemModel(sequelize, Sequelize),
	Submission: SubmissionModel(sequelize, Sequelize)
};