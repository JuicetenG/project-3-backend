const express = require('express');
const router = express.Router();

const Project = require('../models/project');
const verifyToken = require('../middleware/verify-token');


router.post('/', verifyToken, async (req, res) => {
  try {
    req.body.user = req.user._id;
    const project = await Project.create(req.body);
    project._doc.user = req.user;
    res.status(201).json(project);
  } catch(err) {  
    res.status(500).json({ err: err.message });
  }
});


module.exports = router;