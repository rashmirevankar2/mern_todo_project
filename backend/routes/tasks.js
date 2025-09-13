const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');
// Create task
router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    if(!content) return res.status(400).json({ message: 'Content required' });
    const task = new Task({ content, user: req.user.id });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
// Get tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
// Update task
router.put('/:id', auth, async (req, res) => {
  try {
    const { content, completed } = req.body;
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({ message: 'Task not found' });
    if(task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    if(content !== undefined) task.content = content;
    if(completed !== undefined) task.completed = completed;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
// Delete task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({ message: 'Task not found' });
    if(task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });
    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
module.exports = router;
