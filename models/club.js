module.exports = function (sequelize, DataTypes) {
    var Club = sequelize.define('Club', {
        clubname: DataTypes.STRING,
        description: DataTypes.STRING,
        activeeventid: DataTypes.STRING,
        expiredevents: DataTypes.STRING
    });

    Club.associate = function (models) {
        // Associating Club with Users
        Club.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            through: models.UserClubs
        });
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

