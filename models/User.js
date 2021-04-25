const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {}
    },
    thoughts:[],
    friends:[]
})

const User = model('User', UserSchema)

module.exports = User