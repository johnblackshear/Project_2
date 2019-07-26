module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING
    });

    User.associate = function (models) {
        User.belongsToMany(models.Club, {
            through: models.UserClubs
        });
    };

    return User;
};

