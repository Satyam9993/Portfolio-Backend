const express = require('express');
const router = express.Router();

const Auth = require('./Auth/Auth')
const Skills = require('./Skill/Skills')
const UserData = require('./Userdata/Userdata')
const Aboutme = require('./Aboutme/Aboutme')
const Experience = require('./Experience/Experience')
const Project = require('./Project/Project')
const Education = require('./Education/Education')
const ContactMSG = require('./ContactMSG/ContactMSG')

router.use('/auth', Auth)
router.use('/user', UserData)
router.use('/skill', Skills)
router.use('/about', Aboutme)
router.use('/about', Aboutme)
router.use('/experience', Experience)
router.use('/project', Project)
router.use('/education', Education)
router.use('/contact', ContactMSG)


// router.post('/', (req, res)=>{
//     console.log("Satyam ,", req.body)
//     res.send({"Success":"true"})
// })


module.exports = router;