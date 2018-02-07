let router = require('express').Router();
let sequelize = require('../db.js');
let User = sequelize.import('../models/user.js');
let Sleep = sequelize.import('../models/sleep.js');

router.post('/', function (req, res) {
    //variables
    let hours = req.body.sleep.hours;
    let owner = req.user.id;

// methods
 //objects in the model
 Sleep
    .create({
        hours: hours,
        owner: owner
    })
    .then(
    //createSuccess Function
    function createSuccess(sleep) {
        //send a response as json
        res.json({
            sleep: sleep
        });
    },
    //createError function
    function createError(err) {
        res.send(500, err.message);
    }
    );
            });

router.get('/', function(req,res) {
    //user variable 
    let userid = req.user.id;
    Sleep
    .findAll({
        where: { owner: userid }
    })
    .then(
        //success
        function findAllSuccess(data) {
            res.json({
                message: 'sleep',
                data: data
            });
        },
        
        //failure
        function findAllError(err) {
            res.send(500, err.message);
        }
        
    );
   
});
  
module.exports = router;