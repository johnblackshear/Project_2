module.exports = function (sequelize, DataTypes) {
    var Club = sequelize.define('Club', {
        clubname: DataTypes.STRING,
        description: DataTypes.STRING
    });

    Club.associate = function (models) {
        Club.belongsTo(models.User)
    };

    return Club;
};

