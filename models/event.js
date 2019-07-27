module.exports = function (sequelize, DataTypes) {
    var Event = sequelize.define('Event', {
        eventname: DataTypes.STRING,
        description: DataTypes.STRING,
        book: DataTypes.STRING,
        startdate: DataTypes.DATE,
        enddate: DataTypes.DATE
    });

    Event.associate = function (models) {
        Event.belongsTo(models.Club);
    };

    return Event;
};