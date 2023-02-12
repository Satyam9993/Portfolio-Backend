const express = require('express');
const router = express.Router();
const {AddExperience, EditExperience, deleteExperience} = require("../../actions/Experience/Experience")
const fetchUser = require('../../middleware/fetchUser')


router.post('/add/:userId', fetchUser, AddExperience)
router.post('/edit/:expId', fetchUser, EditExperience)
router.delete('/remove/:expId', fetchUser, deleteExperience)

module.exports = router;