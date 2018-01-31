let router = require('express').Router();
let sequelize = require('../db.js');
let User = sequelize.import('../models/user.js');

router.post('/', function (req, res) {
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

module.exports = router;