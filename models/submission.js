module.exports = (sequelize, type) => {
	return sequelize.define('submission', {
		netid: {
			type: type.STRING,
			primaryKey: true,
			allowNull: false
		},
		problemid: {
			type: type.INTEGER,
			allowNull: false
		},
		attempt: {
			type: type.INTEGER,
			allowNull: false
		},
		timeTook: {
			type: type.INTEGER,
			allowNull: false
		},
		lastAttemptTime: {
			type: type.DATE
		}
	}, {
		paranoid: true,
		timestamps: false
	});
};