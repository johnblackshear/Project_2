module.exports = function (sequelize, DataTypes) {
    var Popclub = sequelize.define('Popclub', {
        clubname: DataTypes.STRING,
        description: DataTypes.STRING,
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        userCount: {type: DataTypes.STRING}
    });

    Popclub.associate = function (models) {
            Popclub.belongsTo(models.User);
            Popclub.belongsToMany(models.User, { as: 'Users', through: { model: models.User_Club, unique: false }, foreignKey: 'club_id' });
            Popclub.hasMany(models.Event, {
                onDelete: "cascade"
        });
    };
    return Popclub;

};