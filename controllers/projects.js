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

router.get('/', verifyToken, async(req, res) => {
  try {
    const projects = await Project.find({}).populate('user');
    res.status(200).json(projects);

  } catch(err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/:projectId', verifyToken, async(req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate('user');
    res.status(200).json(project);

  } catch(err) {
    res.status(500).json({ err: err.message });
  }
});

router.put('/:projectId', verifyToken, async(req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if(!project.user.equals(req.user._id)) {
      return res.status(403).send('access denied');
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedProject);

  } catch(err) {
    res.status(500).json({ err: err.message });
  }
});

router.delete('/:projectId', verifyToken, async(req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if(!project.user.equals(req.user._id)) {
      return res.status(403).send('access denied');
    }

    const deletedProject = await Project.findByIdAndDelete(req.params.projectId);
    res.status(200).json(deletedProject);

  } catch(err) {
    res.status(500).json({ err: err.message });
  }
});

router.post('/:projectId/tasks', verifyToken, async(req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    project.tasks.push(req.body); 
    await project.save();
    const newTask = project.tasks[project.tasks.length - 1];
    res.status(201).json(newTask);

  } catch(err) {
    res.status(500).json({ err: err.message });
  }
});

// router.put('/:projectId/tasks/:taskId', verifyToken, async(req, res) => {
//   try{
//     const project = await Project.findById(req.params.projectId);
    
//     if(!project.user.equals(req.user._id)) {
//       return res.status(403).send('access denied');
//     }

//     const updatedTask = await Project.tasks.findByIdAndUpdate(
//       req.params.taskId,
//       req.body,
//       { new: true }
//     );
   
//     await project.save();
//     res.status(200).json(updatedTask);

//   } catch(err) {
//     res.status(500).json({ err: err.message });
//   }
// });


module.exports = router;