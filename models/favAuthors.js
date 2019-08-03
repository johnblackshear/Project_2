module.exports = function (sequelize, DataTypes) {
    var favAuthors = sequelize.define('favAuthors', {
        favAuthor: DataTypes.STRING,
    });

    favAuthors.associate = function (models) {
        favAuthors.belongsTo(models.User);
    };
  

    return favAuthors;
};