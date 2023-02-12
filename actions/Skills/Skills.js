const User = require("../../models/User/User");
const Skills = require("../../models/User/Skills");

exports.createSkills = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(401).send({ err: "Server Error" });
    }
    if (userId != req.user.id) {
      res.status(401).send({ err: "UnAuthorized Request" });
    }
    const newskill = {
      name: req.body.name,
      institution: req.body.institution,
      level: req.body.level,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      user:userId,
      certificateurl:req.body.certificateurl
    };
    await Skills.create(newskill).then(async (skill) => {
        console.log(skill);
        await User.findByIdAndUpdate({_id:userId}, {$push:{"skills":skill._id}}).then((user)=>{
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

exports.editSkills = async (req, res) => {
  try {
    const skillId = req.params.skillId;
    if (!skillId) {
      res.status(401).send({ err: "Server Error" });
    }
    const newskill = {
      name: req.body.name,
      institution: req.body.institution,
      level: req.body.level,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      certificateurl:req.body.certificateurl
    };
    await Skills.findByIdAndUpdate({_id: skillId}, {$set:{
      "name": req.body.name,
      "institution": req.body.institution,
      "level": req.body.level,
      "startDate": new Date(req.body.startDate),
      "endDate": new Date(req.body.endDate),
      "certificateurl":req.body.certificateurl
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

exports.removeSkills = async (req, res) => {
  try {
    const skillId = req.params.skillId;
    if (!skillId) {
      res.status(401).send({ err: "Server Error" });
    }
    await Skills.findByIdAndDelete({_id: skillId}).then(async (skill) => {
      await User.findByIdAndUpdate({_id : req.user.id}, {$pull:{
        "skills": skillId
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
