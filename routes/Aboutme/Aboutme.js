const express = require('express');
const router = express.Router();
const {editAboutme, editProfilePhoto} = require("../../actions/Aboutme/Aboutme")
const fetchUser = require('../../middleware/fetchUser')


router.post('/edit/:userId', fetchUser, editAboutme)
router.post('/editprofilephoto/:userId', fetchUser, editProfilePhoto)

module.exports = router;