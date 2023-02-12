const User = require("../../models/User/User");
const Education = require('../../models/User/Education')

exports.AddEducationDetail = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      res.status(401).send({ err: "Authenfication Error" });
    }
    if(!req.body.courseName || !req.body.institutionName || !req.body.startYear || !req.body.endYear || !req.body.performance){
      res.status(401).send({ success:false, error: "Something went Wrong!!" });
    }
    const educationInfo = {
      courseName: req.body.courseName,
      stream: req.body.stream,
      institutionName: req.body.institutionName,
      user : req.user.id,
      startYear: req.body.startYear,
      endYear: req.body.endYear,
      performance: req.body.performance,
    }
    await Education.create(educationInfo).then(async (edu) => {
      await User.findByIdAndUpdate({_id:userId}, {$push:{"education":edu._id}}).then((user)=>{
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

exports.EditEducationDetail = async (req, res) => {
  try {
    const eduId = req.params.eduId;
    if (!eduId) {
      res.status(401).send({ err: "Authenfication Error" });
    }
    if(!req.body.courseName || !req.body.institutionName || !req.body.startYear || !req.body.endYear || !req.body.performance){
      res.status(401).send({ success:false, error: "Something went Wrong!!" });
    }
    // const educationInfo = {
      // courseName: req.body.courseName,
      // stream: req.body.stream,
      // institutionName: req.body.institutionName,
      // user : req.user.id,
      // startYear: req.body.startYear,
      // endYear: req.body.endYear,
      // performance: req.body.performance,
    // }
    await Education.findByIdAndUpdate({_id: eduId}, {
      $set:{
        "courseName": req.body.courseName,
        "stream": req.body.stream,
        "institutionName": req.body.institutionName,
        "startYear": req.body.startYear,
        "endYear": req.body.endYear,
        "performance": req.body.performance,
      }
    }).then(async (edu) => {
      res.status(200).send({success:true, result:edu})
  }).catch((err)=>{
      console.log("Error", err);
  })
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "server error" });
  }
};

exports.RemoveEducationDetail = async (req, res) => {
  try {
    const eduId = req.params.eduId;

    await Education.findByIdAndDelete(eduId).then(async (edu) => {
      await User.findByIdAndUpdate({_id:req.user.id}, {$pull:{"education":eduId}}).then((user)=>{
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

module.exports;
