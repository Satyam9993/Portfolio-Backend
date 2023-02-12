const express = require('express');
const router = express.Router();
const fetchuser  = require('../../middleware/fetchUser')
const {createSkills, editSkills, removeSkills} = require("../../actions/Skills/Skills")


router.post('/add/:id',fetchuser, createSkills)
router.post('/edit/:skillId',fetchuser, editSkills)
router.delete('/remove/:skillId',fetchuser, removeSkills)

module.exports = router;