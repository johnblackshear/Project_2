module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        location: { type: DataTypes.STRING, defaultValue: "<a href='/edit/'>Add your location</a>"},
        favGenres: { type: DataTypes.STRING, defaultValue: "<a href='/edit/'>Add your favorite genres</a>"},
        favAuthors: { type: DataTypes.STRING, defaultValue: "<a href='/edit/'>Add your favorite authors</a>"},
        favBooks: { type: DataTypes.STRING, defaultValue: "<a href='/edit/'>Add your favorite books</a>"},
        profilePic: { type: DataTypes.STRING, defaultValue: "/images/profile_pic.jpg"},
        updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    });

    User.associate = function (models) {
        User.hasMany(models.Club, {
            onDelete: "cascade"
        });

    User.belongsToMany(models.Club, { as: 'Clubs2', through: { model: models.User_Club, unique: false }, foreignKey: 'user_id' });

    };

    return User;
};
