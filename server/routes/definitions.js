let router = require('express').Router();
let sequelize = require('../db.js');
let User = sequelize.import('../models/user.js');
let Definition = sequelize.import('../models/definitions.js');

router.post('/', function (req, res) {
    //variables
    let description = req.body.definition.desc;
    let logType = req.body.definition.type;
    let owner = req.user.id;

// methods
Definition //objects in the model
    .create({
        description: description,
        logType: logType,
        owner: owner
    })
    .then(
    //createSuccess Function
    function creatSuccess(definition) {
        //send a response as json
        res.json({
            definition: definition
        });
    },
    //createError function
    function createError(err) {
        res.send(500, er.message);
    }
    );
            });

router.get('/', function(req,res) {
    //user variable 
    let userid = req.user.id;
    definition
    //findAll by owner method
    .findAll({
        where: { owner: userid }
    })
    .then(
        //success
        function findAllSuccess(data) {
            console.log(data);
            res.json(data);
        },
        //failure
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});
  
module.exports = router;