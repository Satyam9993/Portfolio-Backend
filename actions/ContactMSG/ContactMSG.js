const User = require("../../models/User/User");
// const Education = require('../../models/User/Education')
const ContactMSG = require('../../models/User/ContactMSG')

exports.AddContactMSG = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      res.status(401).send({ err: "Authenfication Error" });
    }
    if(!req.body.email || !req.body.name || !req.body.msg){
      res.status(401).send({ success:false, error: "Something went Wrong!!" });
    }
    const ContactMSGInfo = {
        email: req.body.email,
        name: req.body.name,
        msg: req.body.msg,
        user : userId,
    }
    await ContactMSG.create(ContactMSGInfo).then(async (contactmsg) => {
      await User.findByIdAndUpdate({_id:userId}, {$push:{"contactmsg":contactmsg._id}}).then((user)=>{
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

exports.RemoveContactMSG = async (req, res) => {
  try {
    const contactmsgId = req.params.contactmsgId;

    await ContactMSG.findByIdAndDelete(contactmsgId).then(async (contactmsg) => {
      await User.findByIdAndUpdate({_id:req.user.id}, {$pull:{"contactmsg":contactmsgId}}).then((user)=>{
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
