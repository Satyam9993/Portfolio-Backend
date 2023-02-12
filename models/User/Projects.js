const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    imageurl:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    githuburl:{
        type: String,
        required:true,
    },
    projecturl:{
        type: String,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    createdOn : {
        type: Date,
        default: Date.now
    }
});
const Projects = mongoose.model('projects', ProjectSchema);
module.exports = Projects;