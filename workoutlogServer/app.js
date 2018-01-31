let express = require('express');
let app = express();
let bodyParser = require('body-parser');


app.use(bodyParser.json());

app.post('/api/user', function (req, res) {
    let username = req.body.user.username;
    let pass = req.body.user.password;

    User.create({
        username: username,
        passwordhash: ""

    }).then(
        function createSuccess(user) {
            res.json({
                user: user,
                message: 'create'
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
        );
});

app.use(require('./middleware/headers'));
app.use('/api/test', function (req, res) {
    res.send('hello World')
})
app.listen(3000, function () {
    console.log("app is open on 3000!");
})

let Sequelize = require('sequelize');
let sequelize = new Sequelize('workoutlog', 'postgres', 'Ij7Ae7Ns0S@10414forever', {
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


//user model in sqllize

let User = sequelize.define('user', {
    username: Sequelize.STRING,
    passwordhash: Sequelize.STRING,
});
//User.sync();
//to drop table
User.sync({ force: true });

