const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/date-format');

const friendSchema = new Schema({
    friendId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId() 
    },
    friendName: {
        type: String,
        trim: true,
        unique: true,
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
        getters: true
    },
    id: false
},)

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        // validate email address format
    },
    friends: [],
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;