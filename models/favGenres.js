module.exports = function (sequelize, DataTypes) {
    var favGenres = sequelize.define('favGenres', {
        genre: DataTypes.STRING,
    });

    favGenres.associate = function (models) {
        favGenres.belongsTo(models.User);
    };

    return favGenres;
};