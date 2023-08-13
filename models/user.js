const mongoose = require('mongoose');
const schema = mongoose.Schema
    
const userSchema = new schema({
            username: {
                type: String
            },
            password: {
                type: String
            }
        },{
            timestamps: true,
        })

const User = mongoose.model('User', userSchema)

module.exports = User