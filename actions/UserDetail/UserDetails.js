const User = require("../../models/User/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../../middleware/fetchUser");
const axios = require("axios");
const skills = require("../../models/User/Skills");
const Education = require("../../models/User/Education");
const Experience = require("../../models/User/Experience");
const Projects = require("../../models/User/Projects");
const ContactMSG = require("../../models/User/ContactMSG")

const JWT_SECRET = process.env.JWT_SECRET;

exports.getUserDatabyUserName = async (req, res) => {
  try {
    const username = req.params.username;
    if (!username) {
      return res
        .status(404)
        .json({ success: false, errmsg: "Cannot get User Name" });
    }
    await User.findOne({userName : username})
    .populate([
        {
            path : "skills",
            model : skills
        },
        {
            path : "education",
            model: Education
        },
        {
            path : "experience",
            model: Experience
        },
        {
            path : "projects",
            model : Projects
        },
        {
          path : "contactmsg",
          model : ContactMSG
        }
    ]).then((user)=>{
        res.status(200).send({success : true, user : user});
    }).catch((err)=>{
        res.status(402).send({ success: false, error: err });
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, error: "server error" });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res
        .status(404)
        .json({ success: false, errmsg: "Cannot get User Name" });
    }
    await User.findById({_id:userId})
    .populate([
        {
            path : "skills",
            model : skills
        },
        {
            path : "education",
            model: Education
        },
        {
            path : "experience",
            model: Experience
        },
        {
            path : "projects",
            model : Projects
        },
        {
          path : "contactmsg",
          model : ContactMSG
        }
    ]).then((user)=>{
        res.status(200).send({success : true, user : user});
    }).catch((err)=>{
        res.status(402).send({ success: false, error: err });
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, error: "server error" });
  }
}

module.exports;
