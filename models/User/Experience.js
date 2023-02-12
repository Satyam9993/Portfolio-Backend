const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExperienceSchema = new Schema({
    type : {
        type: String,
        required: true,
        enum: ["internship", "job", "free-lancing", "open-source", "personal project"]
    },
    companyName:{
        type: String,
        default :"NA",
    },
    role:{
        type: String,
        required:true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    certificateurl:{
        type:String
    },
    description : {
        type: String,
        required: true
    },
    createdOn : {
        type: Date,
        default: Date.now
    }
});
const experience = mongoose.model('experience', ExperienceSchema);
module.exports = experience;