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
        // validate: {}
    },
    thoughts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
}
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', UserSchema)

module.exports = User