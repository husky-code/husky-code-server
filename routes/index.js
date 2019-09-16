var express = require('express'),
	router = express.Router();

router.get('/', (req, res) => {
	// TODO: what should be done with this route?
	res.send('<h1>Hello World!</h1>');
});

/* Auth routes */
router.use('/auth', require('./auth'));

/* Models routes */
router.use('/users', require('./users'));
router.use('/problems', require('./problems'));

// Handle HTTP Error 404 (page not found)
router.get('*', (req, res) => {
	res.status(404).json({
		status: res.statusCode,
		msg: 'The URL specified does not exist'
	});
});

module.exports = router;