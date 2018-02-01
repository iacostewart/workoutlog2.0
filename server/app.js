require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let sequelize = require('./db.js')
let User = sequelize.import('./models/user.js')

sequelize.sync();
//User.sync(); 
//to drop table
//User.sync({ force: true });

// MIDDLEWARE (Bouncer)
app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));

// ROUTES (entrances)
app.use('/api/login', require('./routes/session.js'));
app.use('/api/user', require('./routes/user.js'));
app.use('/api/definition', require('./routes/definitions.js'));
app.use('/api/log', require('./routes/log.js'));
app.use('/api/test', function (req, res) {
    res.send('hello World')
})

app.listen(3000, function () {
    console.log("app is open on 3000!");
})
