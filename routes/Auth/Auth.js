const express = require('express');
const router = express.Router();
const {loginUser, signInUser, EmailVerification, loginUserdata} = require("../../actions/Auth/Auth")
const fetchUser = require('../../middleware/fetchUser')


router.post('/signin', signInUser)
router.post('/verifyotp', EmailVerification)

router.post('/login', loginUser)
router.get('/login/data',fetchUser, loginUserdata)

module.exports = router;