const express = require('express');
const router = express.Router();
const User = require('../models/user');


//!! Get list of users from the db
router.get('/users', (req, res, next) => {
    res.send({ type: 'GET' });
});

//!! Add a new user to the db
router.post('/users', (req, res, next) => {

    //!! 1)
    //let user = new User(req.body);
    //user.save();

    //!! 2)
    User.create(req.body)
    .then( (user) => {
        console.log(user);
        res.send({result:'ok', data: user});    
    })
    .catch(next);

    //console.log(req.body);
    // res.send({
    //     type: 'POST',
    //     name: req.body.name,
    //     email: req.body.email,
    //     level: req.body.level
    // });
});

//!! Update a user in the db
router.put('/users/:id', (req, res, next) => {
    res.send({
        type: 'PUT',
        id: req.params.id
    });
});

//!! Delete a user in the db
router.delete('/users/:id', (req, res, next) => {

    User.findByIdAndRemove({_id: req.params.id})
    .then( (user) => {
        res.send(user);
    })
    .catch(next);

    //console.log(req.params.id);
    //res.send('ok');

    // res.send({
    //     type: 'DELETE',
    //     id: req.params.id
    // });
});

//!! Export the router
module.exports = router;