// TODO: update Azure tables
module.exports = (sequelize, type) => {
	return sequelize.define('problem', {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		name: {
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
		course: {
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