const User = require("../../models/User/User");
const bcrypt = require("bcryptjs");
const Experience = require('../../models/User/Experience')

const JWT_SECRET = process.env.JWT_SECRET;

exports.AddExperience = async (req, res) => {
  try {
    const userId = req.params.userId;
    if(userId != req.user.id){
        return res.status(404).send({success : false,  error: "Not a Valid request" });    
    }
    if(!req.body.type && !req.body.companyName && !req.body.role && !req.body.description){
      return res.status(404).send({success : false,  error: "Data is missing" }); 
    }
    const data = {
        type : req.body.type,
        companyName : req.body.companyName,
        role : req.body.role,
        // certificateurl : req.body.certificateurl,
        description : req.body.description
    }

    if(req.body.certificateurl){
      data.certificateurl = req.body.certificateurl
    }

    await Experience.create(data).then(async (exp) => {
      await User.findByIdAndUpdate({_id:userId}, {$push:{"experience":exp._id}}).then((user)=>{
          return res.status(200).send({success:true, result:user})
      }).catch((err)=>{
          console.log("Error");
          return res.status(400).send({success:false, err:err})
      })
  }).catch((err)=>{
      console.log("Error", err);
  })


  } catch (error) {
    console.log(error.message);
    res.status(500).send({success : false,  error: "server error" });
  }
};

exports.EditExperience = async (req, res) => {
  try {
    const expId = req.params.expId;

    const data = {
        type : req.body.type,
        companyName : req.body.companyName,
        user : req.user.id,
        role : req.body.role,
        description : req.body.description
    }
    if(req.body.certificateurl){
      data.certificateurl = req.body.certificateurl
    }

    await Experience.findByIdAndUpdate({_id:expId}, data).then((exp)=>{
      res.status(200).send({"success":true, exp: exp})
    }).catch((err)=>{
      res.status(500).send({success : false,  error: "something went wrong" });
    })

  } catch (error) {
    console.log(error.message);
    res.status(500).send({success : false,  error: "server error" });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const expId = req.params.expId;
    await Experience.findByIdAndRemove({_id:expId}).then(async(exp)=>{
      await User.findByIdAndUpdate({_id : req.user.id}, {$pull:{
        "experience": expId
      }}).then((user)=>{
        res.status(200).send({success:true});   
      }).catch((error)=>{
        res.status(200).send({success:false, error:error})
      })
    }).catch((err)=>{
      res.status(500).send({success : false,  error: "something went wrong" });
    })

  } catch (error) {
    console.log(error.message);
    res.status(500).send({success : false,  error: "server error" });
  }
};

module.exports;
