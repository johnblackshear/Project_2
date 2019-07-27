module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING
    });

    User.associate = function (models) {
        User.hasMany(models.Club, {
            onDelete: "cascade"
        });

    User.belongsToMany(models.Club, { as: 'Clubs2', through: { model: models.User_Club, unique: false }, foreignKey: 'user_id' });

    };

    return User;
};


// module.exports = function (sequelize, DataTypes) {
//     var User = sequelize.define("User", {
//         username: DataTypes.STRING,
//         password: DataTypes.STRING,
//         email: DataTypes.STRING
//     });

//     User.associate = function (models) {
//         User.hasMany(models.Club, {
//             onDelete: "cascade"
//         });

//     User.belongsToMany(models.Club, { as: 'Clubs2', through: { model: models.User_Club, unique: false }, foreignKey: 'user_id' });

//     };

//     return User;