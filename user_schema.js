const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name :String,
    username : String,
    phone : String,
    password : String,
});

const User = mongoose.model('Users', userSchema);
module.exports = User;