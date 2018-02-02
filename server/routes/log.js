let router = require('express').Router();
let sequelize = require('../db');
let Log = sequelize.import('../models/log.js');
let User = sequelize.import('../models/definitions.js');
//Log.sync({force: true})
router.post('/', function(req,res){
    //req has some body properties that hav a usernam and pwd
    let description = req.body.log.desc;
    let result = req.body.log.result;
    let user = req.user.id;
    let definition = req.body.log.def;


    // use our sequelize model to create log
    Log
    .create({
        description: description,
        result: result, 
        owner: user,
        def: definition
    })
    .then(
        function createSuccess(log) {
            res.json(log);
        },
            function createError(err) {
                res.send(500, err.message);
            }
    );
});

router.get('/', function(req, res) {
    let userid = req.user.id;
   // console.log(req.user)
    Log
    .findAll({
        where: { owner: userid }
    })
    .then(
        function findAllSuccess(data) {
            res.json({
                message: 'logs',
                data: data
            });
        },
        function findAllError(err) {
            res.json({
                message: err.message,
                data: req.user
            });
        }
    );
});

router.delete('/', function(req, res) {
    let data = req.body.log.id;
    
    Log
    .destroy({
            where: { id: data }

        }).then( 
            function deleteLogSuccess(data){
                res.send("you removed a log");
            },
            function deleteLogError(err) {
                res.send(500, err.message);
            }
        );
});

module.exports = router;