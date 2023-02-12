const express = require('express');
const router = express.Router();
const fetchuser  = require('../../middleware/fetchUser')
const {AddContactMSG, RemoveContactMSG} = require("../../actions/ContactMSG/ContactMSG")


router.post('/add', AddContactMSG)
router.delete('/remove/:contactmsgId',fetchuser, RemoveContactMSG)


module.exports = router;