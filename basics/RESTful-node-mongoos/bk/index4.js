const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

//!! Connect to mongoDB, the 'userdb'
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
//!! 1)
//const routes = require('./routes/api');
//app.use('/api/', routes);

//!! 2)
app.use('/api/', require('./routes/api'));


// app.use(() => (req, res, next) => {
//     console.log(''); 
// });


//!!
//!! Error handling middleware
//!!
app.use( (err, req, res, next) =>{
    //console.log(err);
    res.status(422).send({error: err.message});
});


const port = process.env.port || 4000;
app.listen(port, (s) => {
    console.log('Server is listening for request on port ' + port);
});
