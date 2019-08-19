var express = require('express'),
	app = express(),
	routes = require('./routes'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	passport = require('passport');
	
const PORT = process.env.PORT || 3000,
	db = require('./db');
	
// PASSPORT STRATEGIES
var passportLocal = require('passport-local').Strategy,
	passportJWT = require('passport-jwt').Strategy;
	
if (!db.connected()) {
	db.init();
}

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.static("images"));
// app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

app.set('port', PORT);

app.use('/', routes);

app.listen(PORT, () => {
	console.log(`App is up and running. Listening on port ${PORT}`);
});