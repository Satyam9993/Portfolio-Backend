const express = require('express');
const router = express.Router();
const fetchuser  = require('../../middleware/fetchUser')
const {getUserDatabyUserName, getUserData} = require("../../actions/UserDetail/UserDetails")


router.get('/:userId', getUserDatabyUserName)
router.get('/data/:userId', getUserData)

module.exports = router;