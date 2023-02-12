const express = require('express');
const router = express.Router();
const fetchuser  = require('../../middleware/fetchUser')
const {AddProject,editproject, removeProject} = require("../../actions/Project/Project")


router.post('/add',fetchuser, AddProject)
router.post('/edit/:projectId',fetchuser, editproject)
router.delete('/remove/:projectId',fetchuser, removeProject)

module.exports = router;