module.exports = (sequelize, type) => {
	return sequelize.define('problem', {
		// TODO: rename problemid and problemName as id and name in Azure
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