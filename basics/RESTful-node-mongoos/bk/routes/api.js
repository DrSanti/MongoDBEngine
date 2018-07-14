const express = require('express');
const router = express.Router();
const User = require('../models/user');


//!!
//!! Get list of users from the db
router.get('/users', (req, res, next) => {
    res.send({ type: 'GET' });
});


//!!
//!! Add a new user to the db
router.post('/users', (req, res, next) => {
    User.create(req.body)
    .then( (user) => {
        res.send({result:'ok', data: user});    
    })
    .catch(next);
});

//!!
//!! Update a user in the db
router.put('/users/:id', (req, res, next) => {
    User.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then( () => {
        User.findOne({_id: req.params.id})
        .then( (user) => {
            res.send(user);
        })
    })
    .catch(next); 
});

//!!
//!! Delete a user in the db
router.delete('/users/:id', (req, res, next) => {

    User.findByIdAndRemove({_id: req.params.id})
    .then( (user) => {
        res.send(user);
    })
    .catch(next);
});

//!!
//!! Export the router
module.exports = router;




//!!
//!! Helper functions
//!!

function readAllUsers() {
    return( new Promise((resolve, reject) => {
        User.find({})
        .then( (users) => {
            resolve(users);   // return an array of objects
        })
        .catch((err) => {
            reject(err);
        });
    }));
}

module.exports.readAllUsers = readAllUsers;
