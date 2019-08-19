// TODO: determine how to use strategies

module.exports = (passport, Users, LocalStrategy) => {
	passport.use(new LocalStrategy({
		usernameField: 'netid',
		passwordField: 'passwd',
		passReqToCallback: true
		},
		(req, netid, passwd, done) => {
			Users.findByPk(req.body.netid).then(user => {
				if (user == null) {
					res.send('Username does not exist');
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
									res.status(500).send(err);
								} else {
									res.send(token);
								}
							});
						} else {
							res.send('Invalid login. Username and password do not match');
						}
					});
				}
			}).catch(err => {
				res.status(500).send(err);
			});
		}
	));
};