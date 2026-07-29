const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
    token:{
        type: String,
        required : true
    }
},{ timestamps: {
        type: Date,
        default: Date.now,
        expires: 3600
} 
})


const blacklistModel = mongoose.model("Blacklist", blacklistSchema);

module.exports = blacklistModel;