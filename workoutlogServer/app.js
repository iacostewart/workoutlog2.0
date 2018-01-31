let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let sequelize = require('./db.js')
let User = sequelize.import('./models/user.js')
User.sync();
//to drop table
//User.sync({ force: true });
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




//user model in sqllize




