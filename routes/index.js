var express = require('express'),
	router = express.Router();

router.get('/', (req, res) => {
	// TODO: authentication, redirect to login/register
//  if (middleware.isAuthenticated) {
// 		res.redirect('/dashboard');
// 	}
	res.send('<h1>Hello World!</h1>');
});

/* Auth routes */
router.use('/auth', require('./auth'));

/* Models routes */
router.use('/users', require('./users'));

// Handle HTTP Error 404 (page not found)
router.get('*', (req, res) => {
	res.status(404).send('<h1>Error 404: Page not found</h1><hr>');
});

module.exports = router;