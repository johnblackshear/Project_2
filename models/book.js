module.exports = function (sequelize, DataTypes) {
    var Book = sequelize.define('Book', {
        bookname: DataTypes.STRING,
        description: DataTypes.STRING,
        pages: DataTypes.INTEGER,
        bookid: DataTypes.STRING
    });

    // Book.associate = function (models) {
    //     Book.belongsTo(models.Club);
    // };

    return Book;
};