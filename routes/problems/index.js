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

// GET available topics for a course
router.get('/:course', (req, res) => {
	Problems.findAll({
		attributes: ['topic'],
		where: {
			course: req.params.course
		}
	}).then(topics => {
		if (topics === null) {
			res.json({
				status: res.statusCode,
				msg: 'No existing topics listed under that course'
			});
		} else {
			var topicList = [];
			topics.forEach((item) => {
				if (item.topic && !topicList.some(topic => topic === item.topic)) {
					topicList.push(item.topic);
				}
			});
			res.json({
				status: res.statusCode,
				course: req.params.course,
				topics: topicList
			});
		}
	}).catch(err => {
		res.status(500).json({
			status: res.statusCode,
			err: err
		});
	});
});

// TODO: correct model fields
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