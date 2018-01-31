

let router = require('express').Router();
let sequelize = require('../db.js');
let User = sequelize.import('../models/user.js');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
router.post('/', function (req, res) {
    let username = req.body.user.username;
    let pass = req.body.user.password;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)

    }).then(
        function createSuccess(user) {
            let token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: 'create',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
        );
});

module.exports = router;