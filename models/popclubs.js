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








// var Module1 = sequelize.define('Module1', {
//     name: DataTypes.STRING
//   }, {
//   associate: function(models) {
//      Module1.hasMany(models.SubModel1);
//      Module1.hasMany(models.SubModel2);
//     Module1.addScope('all', {
//         include: [{
//           model: models.SubModel1
//         }, {
//           model: models.SubModel2
//         }]
//       });
//   }
// });

// var SubModel1 = sequelize.define('SubModel1', {
//     name: DataTypes.STRING
//   });

// var SubModel2 = sequelize.define('SubModel2', {
//     name: DataTypes.STRING
//   });

// return Module1
//     .scope('all')
//     .findAndCountAll({ where: {}, limit: 10, offset: 0 })
