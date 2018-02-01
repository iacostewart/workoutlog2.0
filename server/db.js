let Sequelize = require('sequelize');
let sequelize = new Sequelize('workoutlog', 'postgres', process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function () {
        console.log('connected to workoulog postgress db');
    },
    function (err) {
        console.log(err);
    }
);

let User = sequelize.import('./models/user');
module.exports = sequelize;
