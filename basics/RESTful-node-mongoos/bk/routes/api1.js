const express = require('express');
const router = express.Router();

//!! Get list of users from the db
router.get('/users', (req, res) => {
    res.send({
        type: 'GET'
    });
});

//!! Add a new user to the db
router.post('/users', (req, res) => {
    res.send({
        type: 'POST'
    });
});

//!! Update a user in the db
router.put('/users/:id', (req, res) => {
    res.send({
        type: 'PUT',
        id: req.params.id
    });
});

//!! Delete a user in the db
router.delete('/users/:id', (req, res) => {
    res.send({
        type: 'DELETE',
        id: req.params.id
    });
});

//!! Export the router
module.exports = router;