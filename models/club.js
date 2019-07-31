

module.exports = function (sequelize, DataTypes) {
    var Club = sequelize.define('Club', {
        clubName: DataTypes.STRING,
        description: DataTypes.STRING,
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    });

    Club.associate = function (models) {
        Club.belongsTo(models.User);
        Club.belongsToMany(models.User, { as: 'Users', through: { model: models.User_Club, unique: false }, foreignKey: 'club_id' });



    };

    return Club;
};

// module.exports = function (sequelize, DataTypes) {
//     var Club = sequelize.define('Club', {
//         clubname: DataTypes.STRING,
//         description: DataTypes.STRING
//     });

//     Club.associate = function (models) {
//         Club.belongsTo(models.User);
//         Club.belongsToMany(models.User, { as: 'Users', through: { model: models.User_Club, unique: false }, foreignKey: 'club_id' });



//     };

//     return Club;



