let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let sequelize = require('./db.js')
let User = sequelize.import('./models/user.js')

User.sync();
//to drop table
//User.sync({ force: true });
app.use(bodyParser.json());



app.use(require('./middleware/headers'));
app.use('/api/user', require('./routes/user.js'));
app.use('/api/test', function (req, res) {
    res.send('hello World')
})
app.listen(3000, function () {
    console.log("app is open on 3000!");
})




//user model in sqllize




