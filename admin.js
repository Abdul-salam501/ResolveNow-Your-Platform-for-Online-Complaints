const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Complaint = require('../models/Complaint');
const User = require('../models/User');

// @route    GET api/admin/complaints
// @desc     Get all complaints (Admin)
// @access   Private (Admin)
router.get('/complaints', auth, async (req, res) => {
  try {
    // Check if user is admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/admin/complaints/:id
// @desc     Update complaint status (Admin)
// @access   Private (Admin)
router.put('/complaints/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    const user = await User.findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const { status, assignedTo, resolution } = req.body;

    let complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }

    complaint.status = status || complaint.status;
    complaint.assignedTo = assignedTo || complaint.assignedTo;
    complaint.resolution = resolution || complaint.resolution;
    complaint.updatedAt = Date.now();

    await complaint.save();

    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Complaint not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;