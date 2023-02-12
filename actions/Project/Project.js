const User = require("../../models/User/User");
const Projects = require("../../models/User/Projects")

exports.AddProject = async (req, res) => {
  try {
    const newProject = {
      title: req.body.title,
      description: req.body.description,
      user:req.user.id,
      imageurl:req.body.imageurl,
      projecturl:req.body.projecturl,
      githuburl:req.body.githuburl,
    };
    if(!(req.body.title && req.body.description && req.body.imageurl && req.body.githuburl)){
        res.status(400).send({success:false, err:"Something went wrong!!"})
    }
    await Projects.create(newProject).then(async (project) => {
        await User.findByIdAndUpdate({_id:req.user.id}, {$push:{"projects":project._id}}).then((user)=>{
            res.status(200).send({success:true, result:user})
        }).catch((err)=>{
            console.log("Error");
            res.status(400).send({success:false, err:"Something went wrong!"})
        })
    }).catch((err)=>{
        console.log("Error", err);
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "server error" });
  }
};

exports.editproject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      res.status(401).send({ err: "Server Error" });
    }
    const newProject = {
      title: req.body.title,
      description: req.body.description,
      user:req.user.id,
      imageurl:req.body.imageurl,
      projecturl:req.body.projecturl,
      githuburl:req.body.githuburl,
    };
    await Projects.findByIdAndUpdate({_id: projectId}, {$set:{
      "title": req.body.title,
      "description": req.body.description,
      "imageurl":req.body.imageurl,
      "projecturl":req.body.projecturl,
      "githuburl":req.body.githuburl
    }}).then(async (skill) => {
      res.status(200).send({success:true, result:skill})
    }).catch((err)=>{
        console.log("Error", err);
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "server error" });
  }
};

exports.removeProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    if (!projectId) {
      res.status(401).send({ err: "Server Error" });
    }
    await Projects.findByIdAndDelete({_id: projectId}).then(async (project) => {
      await User.findByIdAndUpdate({_id : req.user.id}, {$pull:{
        "projects": projectId
      }}).then((user)=>{
        res.status(200).send({success:true});   
      }).catch((error)=>{
        res.status(200).send({success:false, error:error})
      })
    }).catch((err)=>{
      res.status(401).send({success:false})
    })
  } catch (error) {
    res.status(500).send({ error: "server error" });
  }
};

module.exports;
