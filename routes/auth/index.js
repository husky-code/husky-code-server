var express = require('express'),
	router = express.Router(),
	bcrypt = require('bcrypt'),
	jwt = require('jsonwebtoken');
	
// var clientSecret = fs.readFileSync('private.key'); // RSA SHA256
var privateKey = 'privateKey'; // test key
	
const db = require('../../db'),
	BCRYPT_SALT_ROUNDS = 12,
	Users = db.User;

// Authenticate user	
router.post('/login', (req, res) => {
	// TODO: use Passport?
	if (!(req.body.hasOwnProperty('netid')) || !(req.body.hasOwnProperty('passwd'))) {
		res.json({
			status: res.statusCode,
			msg: 'Missing required information'
		});
	} else {
		Users.findByPk(req.body.netid).then(user => {
			if (user == null) {
				res.json({
					status: res.statusCode,
					msg: 'Username does not exist'
				});
			} else {
				bcrypt.compare(req.body.passwd, user.passwd).then(result => {
					if (result) {
						var user = {
							netid: req.body.netid,
							passwd: req.body.passwd
						};
						jwt.sign(user, privateKey, { algorithm: 'HS256' }, (err, token) => {
							// TODO: if the choice is to switch to certification instead of client secret,
							// this algorithm must be changed to RS256 for RSA SHA256
							if (err) {
								res.status(500).json({
									status: res.statusCode,
									err: err
								});
							} else {
								res.json({
									status: res.statusCode,
									token: token
								});
							}
						});
					} else {
						res.json({
							status: res.statusCode,
							msg: 'Invalid login. Username and password do not match'
						});
					}
				});
			}
		}).catch(err => {
			res.status(500).send(err);
		});
	}
});

// Register new user
router.post('/register', (req, res) => {
	const data = {
		netid: req.body.netid,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		class: req.body.class,
		passwd: req.body.passwd
	};
	if (data.netid === '' || data.firstname === '' || data.lastname === '' || data.passwd === '') {
		res.json({
			status: res.statusCode,
			msg: 'Missing required information'
		});
	}
	Users.findOne({
		where: {
			netid: data.netid
		}
	}).then(user => {
		if (user != null) {
			res.json({
				status: res.statusCode,
				msg: 'User already exists'
			});
		} else {
			bcrypt.hash(data.passwd, BCRYPT_SALT_ROUNDS).then(hash => {
				Users.create({
					netid: data.netid,
					firstname: data.firstname,
					lastname: data.lastname,
					class: data.class,
					passwd: hash
				}).then(user => {
					res.json({
						status: res.statusCode,
						user: user,
						msg: 'User created'
					});
				});
			});
		}
	}).catch(err => {
		res.status(500).json({
			status: res.statusCode,
			err: err
		});
	});
});

module.exports = router;