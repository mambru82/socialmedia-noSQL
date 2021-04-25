const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js')

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true
            //280 character maximum
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
)
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
    reactions:[ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
)

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema)



module.exports = Thought