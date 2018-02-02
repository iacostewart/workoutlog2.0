
    //1 First we need a function that searches for a particular user that matches the incomming request.
    //2 if the request is sucessful and the username matches, we need to do some stuff.
    // compare the password
    //if the password matches, shwo success and give the user a token. 
    //if the password dosent match, show that falure to authenticate
    //if the request is not sucessful and there is not a user that matches that request, 
    //throw an error. 
    //2 if the request was not seccussful and that user does not exist throw an error
    let router = require('express').Router();
    let bcrypt = require('bcryptjs');
    let jwt = require('jsonwebtoken');
    let sequelize = require('../db.js');
    let User = sequelize.import('../models/user.js');

    router.post('/', function (req, res) {
        User.findOne({ where: { username: req.body.user.username } }).then(
            function (user) {
                if (user) {
                    bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches) {
                        if (matches) {
                            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                            res.json({
                                user: user,
                                message: "Successfully Authenticated",
                                sessionToken: token

                            });
                        } else {
                            res.status(500).send({ error: "failed to authentiate" });
                        }
                    });
                } else {
                    res.status(500).send({ error: "failed to authenticate" });
                }
            },
            function(err) {
                res.json(err);
    
        }

    );
});






module.exports = router;
