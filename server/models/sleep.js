module.exports = function(sequelize, DataTypes) {
    // with define, the first arugment is going to represent a column in the db table 

    return sequelize.define('sleep', {
        hours: DataTypes.STRING,
        owner: DataTypes.INTEGER
        
    },{

    });
};