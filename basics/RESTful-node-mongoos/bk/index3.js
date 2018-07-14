const express = require('express');



const app = express();


/* 
 +-------------------------+
 |          routes         |
 +-------------------------+
*/

//!!
//!! Ex0: localhost:4000/users
//!!
// const routes = require('./routes/api');
// app.use(routes);


//!!
//!! Ex1: localhost:4000/api/users
//!!
// const routes = require('./routes/api');
// app.use('/api', routes);


//!!
//!! Ex2: localhost:4000/api/users
//!!
app.use('/api/', require('./routes/api'));




const port = process.env.port || 4000;
app.listen(port, (s) => {
    console.log('Server is listening for request on port ' + port);
});



