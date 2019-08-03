module.exports = function (sequelize, DataTypes) {
    var favBooks = sequelize.define('favBooks', {
        favBook: DataTypes.STRING,
    });

    favBooks.associate = function (models) {
        favBooks.belongsTo(models.User);
    };

    return favBooks;
};