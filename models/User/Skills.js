const mongoose = require('mongoose');
const { Schema } = mongoose;

const SkillSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    institution : {
        type: String,
        required: true
    },
    level:{
        type: String,
        enum : ['Beginner','Medium','Expert'],
        default:'Beginner',
        required: true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: true
    },
    certificateurl : {
        type: String,
        default : ""
    },
    startDate : {
        type: Date,
        required: true
    },
    endDate : {
        type: Date,
        required: true
    },
    createdOn : {
        type: Date,
        default: Date.now
    }
});
const skills = mongoose.model('skills', SkillSchema);
module.exports = skills;