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
//this will retrieve one workout specified by the log id
router.get('/:id', function(req, res) {
    let data = req.params.id;
    console.log({data}); //for testing data
    Log
        .findOne({
            where: { id: data }
        }).then(
            function getSuccess(updateData) {
                res.json(updateData);
            },
            function getError(err) {
                res.send(500, err.message);
            }
        );
});

//this will return the data from the log that was updated
router.put('/', function(req, res) {
    let description = req.body.log.desc;
    let result = req.body.log.result;
    let data = req.body.log.id;
    let definition = req.body.log.def;
    console.log(req);
    Log
        .update(
            {
                description: description,
                result: result,
                def: definition
            },
            {where: { id: data }}
        ).then(
            function updateSuccess(updatedLog) {
                res.json(updatedLog);
            },

            function updateError(err){
                res.send(500, err.message);
            }
        )
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