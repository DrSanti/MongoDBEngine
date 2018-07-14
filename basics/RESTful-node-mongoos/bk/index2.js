const express = require('express');

const app = express();


/*
//!! 
//!! /
//!! 
app.get('/', (req, res) => {
    console.log('GET request!');
    // 1) 
    //res.end();

    // 2) 
    //res.send('OK!');

    // 3)
    //res.status(200).send('OK!');

    // 4)
    res.send({message: 'Hello'});
});
*/

//!!
//!! GET api
//!! 
app.get('/api', (req, res) => {
    console.log('GET /api request!');
    res.send({message: 'Hello GET API'});
});

//!!
//!! POST api
//!!
app.post('/api', (req, res) => {
    console.log('POST /api request!');
    res.send({message: 'Hello POST API'});
});




const port = process.env.port || 4000;
app.listen(port, (s) => {
    console.log('Server is listening for request on port ' + port);
});



