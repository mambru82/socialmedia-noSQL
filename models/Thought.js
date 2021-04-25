const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js')

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true
        //must be between 1 and 280 characters long
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions:[]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
)

const Thought = model('Thought', ThoughtSchema)

//Reaction schema pending

module.exports = Thought