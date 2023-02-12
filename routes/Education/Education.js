const express = require('express');
const router = express.Router();
const fetchuser  = require('../../middleware/fetchUser')
const {AddEducationDetail, RemoveEducationDetail, EditEducationDetail} = require("../../actions/Education/Education")


router.post('/add',fetchuser, AddEducationDetail)
router.post('/edit/:eduId',fetchuser, EditEducationDetail)
router.delete('/remove/:eduId',fetchuser, RemoveEducationDetail)


module.exports = router;