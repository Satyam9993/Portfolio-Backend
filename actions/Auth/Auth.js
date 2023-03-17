const User = require("../../models/User/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../../middleware/fetchUser");
const axios = require("axios");

const JWT_SECRET = process.env.JWT_SECRET;

exports.signInUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, errmsg: "Email is already exists" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    await EmailVerificationSend(otp, req.body.email)
      .then(async (send) => {
        const salt = await bcrypt.genSalt(10);
        const secured_password = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
          userName: req.body.username,
          email: req.body.email,
          password: secured_password,
          age:req.body.age,
          otp: otp,
        }).then((u)=>{
          console.log("USer created Succesfully");
          res.status(200).send({success : true});
        }).catch((err)=>{
          res.status(500).send({success : false,  errmsg: err });
        })

        // // creating authontification using id
        // const data = {
        //   user: {
        //     id: user.id,
        //   },
        // };
        // // generating authontification token using authtoken
        // const authToken = jwt.sign(data, JWT_SECRET);
        // res.send({ success: "true", authToken: authToken });
        
        
      })
      .catch((error) => {
        res
          .status(200)
          .send({ success: false, errmsg: "Error in sending mail" });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({success : false,  error: "server error" });
  }
};

exports.EmailVerification = async (req, res) => {
  try {
    const {email, otp} = req.body;
    await User.findOne({ email:email}).then(async (user)=>{
      if(user.otp == Number(otp)){
        await User.findOneAndUpdate({ email:email}, {$set:{
          "emailVerify" : true
        }}).then((user)=>{
          const data = {
            user: {
              id: user.id,
            },
          };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.status(200).send({ success: "true", authToken: authToken, userName : user.userName, userId : user.id });
        }).catch((err)=>{
          res.status(401).send({success:false, msg : err})
        })
      }else{
        res.status(401).send({success:false, msg : "Otp not matched"})
      }
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send({success : false,  error: "server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email: email }).then(async (user)=>{
      await bcrypt.compare(password, user.password).then((bc)=>{
        if(bc){
          const payload = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(payload, JWT_SECRET);
          res.status(200).send({ success: "true", authToken: authToken, userName : user.Name, userId : user.id });
        }else{
          res.status(401).send({ success: "false", msg : "Authentification failed"});
        }
      }).catch(err=>{
        res.status(401).send({ error: err });
      })
    }).catch(err=>{
      res.status(401).send({ error: err });
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "server error" });
  }
};

exports.loginUserdata = async (req, res) => {
  try {
    const id = req.user.id;
    User.findById(id).then((user)=>{
      res.status(200).send({ success: "true", loginUserName : user.userName, loginUserId : user.id });
    })
    .catch((err)=>{
      res.status(403).send({ error: "Something went wrong" });
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "server error" });
  }
};

const EmailVerificationSend = async (NUM, email) => {
  const options = {
    method: "POST",
    url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "022d88f3aemsh94b55905b908104p13d4f9jsn211d8228a208",
      "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
    },
    data: `{"personalizations":[{"to":[{"email":"${email}"}],"subject":"Hello, World!"}],"from":{"email":"from_address@example.com"},"content":[{"type":"text/plain","value":"Here is OTP: ${NUM}"}]}`,
  };
  axios
    .request(options)
    .then(function (response) {
      console.log("Email send");
      return response;
    })
    .catch(function (error) {
      console.error("error");
      return false;
    });
};

module.exports;
