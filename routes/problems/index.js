var express = require('express'),
	router = express.Router(),
	bcrypt = require('bcrypt');

const db = require('../../db'),
	BCRYPT_SALT_ROUNDS = 12,
	Problems = db.Problem;
	
router.get('/', (req, res) => { // For dev purposes only
	Problems.findAll().then(problems => {
		if (problems == null) {
			res.json({
				status: res.statusCode,
				msg: 'No existing problems'
			});
		} else {
			res.json({
				status: res.statusCode,
				problems: problems
			});
		}
	}).catch(err => {
		res.status(500).json({
			status: res.statusCode,
			err: err
		});
	});
});

// TODO: correct req param and model field
router.get('/:course', (req, res) => {
	Problems.findAll({
		where: {
			course: req.params.course
		}
	}).then(problems => {
		if (problems === null) {
			res.json({
				status: res.statusCode,
				msg: 'No existing problems listed under that course'
			});
		} else {
			res.json({
				status: res.statusCode,
				problems: problems
			});
		}
	}).catch(err => {
		res.status(500).json({
			status: res.statusCode,
			err: err
		});
	});
});

// TODO: correct req param and model field
router.get('/:course/:topic', (req, res) => {
	Problems.findAll({
		where: {
			course: req.params.course,
			topic: req.params.topic
		}
	}).then(problems => {
		if (problems === null) {
			res.json({
				status: res.statusCode,
				msg: 'No existing problems listed under that course and topic'
			});
		} else {
			res.json({
				status: res.statusCode,
				problems: problems
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