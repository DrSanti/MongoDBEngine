const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//!! Create user schema
const UserSchema = new Schema({
    name:{
        type: String,
        required: [true, '*** Name field is required ***']
    },
    email: {
        type: String,
        required: [true, '*** Email field is required ***']    
    },
    level: {
        type: String,
        required: [true, '*** Level field is required ***']    
    }
});

//!! User collection, the 'smarthome_users', in the db based on the UserSchema
const User = mongoose.model('smarthome_users', UserSchema);

//!! Export the User object
module.exports = User;