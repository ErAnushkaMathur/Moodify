const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[  true, "Please provide a username"],
        unique: [   true, "Username already exists"]
},
    email: {
        type: String,
        required: [ true, "Please provide an email"],
        unique: [   true, "Email already exists"]
},
    password: {
        type: String,
        required: [ true, "Please provide a password"],
        select: false
}
}, {timestamps: true}); 
    
const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;