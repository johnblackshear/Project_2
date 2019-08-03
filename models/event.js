module.exports = function (sequelize, DataTypes) {
    var Event = sequelize.define('Event', {
        eventname: DataTypes.STRING,
        description: DataTypes.STRING,
        date: DataTypes.DATE,
        time: DataTypes.DATE,
        location: DataTypes.STRING,
        booktitle: DataTypes.STRING,
        bookdesc: DataTypes.STRING,
        bookthumbnail: DataTypes.INTEGER
    });

    Event.associate = function (models) {
        Event.belongsTo(models.Club);
    };

    return Event;
};