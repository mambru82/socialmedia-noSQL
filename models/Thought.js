const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true
        //must be between 1 and 280 characters long
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions:[]
})

const Thought = model('Thought', ThoughtSchema)

//Reaction schema pending

module.exports = Thought