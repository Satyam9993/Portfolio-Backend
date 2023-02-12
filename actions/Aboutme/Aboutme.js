const User = require("../../models/User/User");
const fetchuser = require("../../middleware/fetchUser");

const JWT_SECRET = process.env.JWT_SECRET;

exports.editAboutme = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res
        .status(404)
        .json({ success: false, errmsg: "Cannot get User Name" });
    }
    if(req.user.id != userId){
        return res
        .status(401)
        .json({ success: false, errmsg: "UnAuthaorized Request!" });
    }
    const {headline, description, intoduction, Name} = req.body;
    if(!headline || !description || !intoduction || !Name){
        return res
        .status(401)
        .json({ success: false, errmsg: "UnAuthaorized Request!" });
    }
    await User.findByIdAndUpdate({ _id: userId}, {$set:{
        "Name" : Name,
        "aboutme.headline":headline,
        "aboutme.description": description,
        "aboutme.intoduction" : intoduction
    }}).then((user)=>{
        res.status(200).send({success : true, user : user});
    }).catch((err)=>{
        res.status(402).send({ success: false, error: err });
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, error: "server error" });
  }
};


exports.editProfilePhoto = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res
        .status(404)
        .json({ success: false, errmsg: "Cannot get User Name" });
    }
    if(req.user.id != userId){
        return res
        .status(401)
        .json({ success: false, errmsg: "UnAuthaorized Request!" });
    }
    const {profilephoto} = req.body;
    if(!profilephoto){
      return res
        .status(401)
        .json({ success: false, errmsg: "UnAuthaorized Request!" });
    }
    await User.findByIdAndUpdate({ _id: userId}, {$set:{
        "profilephoto" : profilephoto
    }}).then((user)=>{
        res.status(200).send({success : true, user : user});
    }).catch((err)=>{
        res.status(402).send({ success: false, error: err });
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, error: "server error" });
  }
};

module.exports;
