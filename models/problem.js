module.exports = (sequelize, type) => {
	return sequelize.define('problem', {
		problemid: {
			type: type.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		problemName: {
			type: type.STRING,
			allowNull: false
		},
		topic: {
			type: type.STRING,
			allowNull: false
		},
		lang: {
			type: type.STRING,
			allowNull: false
		},
		creator: {
			type: type.STRING
		}
	}, {
		paranoid: true,
		timestamps: false
	});
};