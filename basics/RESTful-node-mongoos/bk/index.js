const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');

const app = express();

//!!
//!! Connect to mongoDB, the 'userdb'
//!!
mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

/* 
 Middleware Stack
 +-------------------------+
 |       body-parser       |
 +-------------------------+
 |         routes          |
 +-------------------------+
 |      error handler      |
 +-------------------------+
*/

//!!
//!! BodyPaser middleware
//!!
app.use(bodyParser.json());


//!!
//!! Routes middleware
//!!
app.use('/api/', routes);


//!!
//!! Error handling middleware
//!!
app.use( (err, req, res, next) =>{
    res.status(422).send({error: err.message});
});

//!!
//!! Start the server
//!!
const port = process.env.port || 4000;
app.listen(port, (s) => {
    console.log('Server is listening for request on port ' + port);
});



const helper = routes;// require('./routes/api');
helper.readAllUsers().then( (users) => {
    //console.log(users.length);
    users.forEach(user => {
        console.log(user.name);  
    });
});
//