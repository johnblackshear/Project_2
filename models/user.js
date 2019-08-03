module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        location: DataTypes.STRING,
        profilePic: { type: DataTypes.STRING, defaultValue: "../../public/images/profile_pic.jpg"},
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    });

    User.associate = function (models) {
        User.hasMany(models.Club, {
            onDelete: "cascade"
        });
    };
    User.associate = function (models) {
        User.hasMany(models.favAuthors, {
            onDelete: "cascade"
        });
    };
    User.associate = function (models) {
        User.hasMany(models.favBooks, {
            onDelete: "cascade"
        });
    };
    User.associate = function (models) {
        User.hasMany(models.favGenres, {
            onDelete: "cascade"
        });
    };

    User.associate = function (models){
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