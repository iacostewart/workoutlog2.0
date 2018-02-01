module.exports = function(sequelize, DataTypes) {
    // with define, the first arugment is going to represent a column in the db table 

    return sequelize.define('definition', {
        description: DataTypes.STRING,
        logType: DataTypes.STRING,/*by time, reps, weight,...*/
        owner: DataTypes.INTEGER

    },{

    });
};