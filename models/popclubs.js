module.exports = function (sequelize, DataTypes) {
    var Popclub = sequelize.define('Popclub', {
        clubname: DataTypes.STRING,
        activeusers: DataTypes.INTEGER,
        description: DataTypes.STRING,
        activeeventid: DataTypes.STRING,
        expiredevents: DataTypes.STRING,
        
    });

    Popclub.associate = function (models) {
        // Associating Club with Users
        Popclub.belongsTo(models.Club, {
            foreignKey: {
                allowNull: false
            },
            through: models.UserClubs
        });
    };
    return Popclub;

};