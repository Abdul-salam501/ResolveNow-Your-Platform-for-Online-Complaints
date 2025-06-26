const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Create complaint
router.post('/', async (req, res) => {
  try {
    const complaint = new Complaint({
      ...req.body,
      user: req.user.id
    });
    await complaint.save();
    res.status(201).send(complaint);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;