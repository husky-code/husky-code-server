var express = require('express'),
	app = express(),
	routes = require('./routes'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	cors = require('cors');
const PORT = process.env.PORT || 3000,
	db = require('./db');
	
// const passport = require('passport'),
// 	passportJWT = require('passport-jwt');
	
if (!db.connected()) {
	db.init();
}

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.static("images"));
// app.use(express.static("public"));

app.set('port', PORT);

app.use('/', routes);

app.listen(PORT, () => {
	console.log(`App is up and running. Listening on port ${PORT}`);
});