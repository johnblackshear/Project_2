module.exports = function (sequelize, DataTypes) {
    var Club = sequelize.define('Club', {
        clubname: DataTypes.STRING,
        description: DataTypes.STRING,
        activeeventid: DataTypes.STRING,
        expiredevents: DataTypes.STRING
    });

    Club.associate = function (models) {
        Club.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            through: models.ClubOwners
        });
    };
    return Club;
};

