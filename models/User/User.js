const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    userName: {
        type: String,
        require : true,
        unique : true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    emailVerify : {
        type: Boolean,
        default : false
    },
    resumeurl : {
        type:String
    },
    Name : {
        type : String,
        required : true,
        default : "New User"
    },
    aboutme:{
        headline : {
            type : String,
            required: true,
            default: "HI, I AM A BTECH STUDENT"
        },
        description : {
            type : String,
            required: true,
            default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        intoduction :{
            type : String,
            required: true,
            default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        }
    },
    skills:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'skills'
    }],
    education:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'education'
    }],
    experience:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'experience'
    }],
    projects:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'projects'
    }],
    contactmsg:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'ContactMSG'
    }],
    password : {
        type: String,
        required: true,
    },
    otp:{
        type: Number
    },
    profilephoto:{
        type : "String"
    },
    age : {
        type : Number,
        required: true
    },
    createdon : {
        type: Date,
        default: Date.now 
    }
});
const user = mongoose.model('user', UserSchema);
module.exports = user;