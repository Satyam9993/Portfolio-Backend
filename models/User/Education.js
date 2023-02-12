const mongoose = require('mongoose');
const { Schema } = mongoose;

const EducationSchema = new Schema({
    imageurl : {
        type:String,
        default : "https://www.svgrepo.com/show/67989/university.svg",
        required : true
    },
    courseName : {
        type: String,
        required: true
    },
    stream:{
        type: String,
        default :"NA",
    },
    institutionName:{
        type: String,
        required:true,
    },
    performance:{
        type: String,
        required:true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required: true
    },
    startYear : {
        type: String,
        required: true
    },
    endYear : {
        type: String,
        required: true
    },
    createdon : {
        type: Date,
        default: Date.now
    }
});
const Education = mongoose.model('education', EducationSchema);
module.exports = Education;