const express = require("express");
const cors = require("cors");
require("./config");
const {
  ComplaintSchema,
  UserSchema,
  AssignedComplaint,
  MessageSchema,
} = require("./Schema");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

// ======================== MESSAGE ROUTES ==========================
app.post("/messages", async (req, res) => {
  try {
    const { name, message, complaintId } = req.body;
    const messageData = new MessageSchema({ name, message, complaintId });
    const messageSaved = await messageData.save();
    res.status(200).json(messageSaved);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
});

app.get("/messages/:complaintId", async (req, res) => {
  try {
    const { complaintId } = req.params;
    const messages = await MessageSchema.find({ complaintId }).sort("-createdAt");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});

// ======================== USER ROUTES =============================
app.post("/SignUp", async (req, res) => {
  try {
    const user = new UserSchema(req.body);
    const resultUser = await user.save();
    res.send(resultUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserSchema.findOne({ email });
  if (!user) return res.status(401).json({ message: "User doesn\`t exist" });
  if (user.password === password) return res.json(user);
  res.status(401).json({ message: "Invalid Credentials" });
});

app.get("/AgentUsers", async (req, res) => {
  try {
    const users = await UserSchema.find({ userType: "Agent" });
    res.status(users.length ? 200 : 404).json(users.length ? users : { error: "User not found" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/OrdinaryUsers", async (req, res) => {
  try {
    const users = await UserSchema.find({ userType: "User" });
    res.status(users.length ? 200 : 404).json(users.length ? users : { error: "User not found" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/AgentUsers/:agentId", async (req, res) => {
  try {
    const user = await UserSchema.findOne({ _id: req.params.agentId });
    res.status(user?.userType === "Agent" ? 200 : 404).json(user?.userType === "Agent" ? user : { error: "User not found" });
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/OrdinaryUsers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserSchema.findOne({ _id: id });
    if (!user) return res.status(404).json({ error: "User not found" });
    await UserSchema.deleteOne({ _id: id });
    await ComplaintSchema.deleteMany({ userId: id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ======================= COMPLAINT ROUTES =========================
app.post("/Complaint/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserSchema.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    const complaint = new ComplaintSchema({ ...req.body, userId });
    const resultComplaint = await complaint.save();
    res.status(201).json(resultComplaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to register complaint", details: error.message });
  }
});

app.get("/status/:id", async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    const comment = await ComplaintSchema.find({ userId: req.params.id });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

app.get("/status", async (req, res) => {
  try {
    const complaints = await ComplaintSchema.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve Complaints" });
  }
});

app.post("/assignedComplaints", async (req, res) => {
  try {
    await AssignedComplaint.create(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: "Failed to add assigned complaint" });
  }
});

app.get("/allcomplaints/:agentId", async (req, res) => {
  try {
    const complaints = await AssignedComplaint.find({ agentId: req.params.agentId });
    const complaintIds = complaints.map((c) => c.complaintId);
    const complaintDetails = await ComplaintSchema.find({ _id: { $in: complaintIds } });
    const updatedComplaints = complaints.map((c) => {
      const detail = complaintDetails.find((d) => d._id.toString() === c.complaintId.toString());
      return detail ? { ...c.toObject(), ...detail.toObject() } : c;
    });
    res.json(updatedComplaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to get complaints" });
  }
});

app.put("/user/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, email, phone } = req.body;
    const user = await UserSchema.findByIdAndUpdate(_id, { name, email, phone }, { new: true });
    res.status(user ? 200 : 404).json(user || { error: "User not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the user" });
  }
});

app.put("/complaint/:complaintId", async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;
    if (!complaintId || !status) return res.status(400).json({ error: "Missing complaintId or status" });

    const updatedComplaint = await ComplaintSchema.findByIdAndUpdate(complaintId, { status }, { new: true });
    await AssignedComplaint.findOneAndUpdate({ complaintId }, { status }, { new: true });

    res.status(updatedComplaint ? 200 : 404).json(updatedComplaint || { error: "Complaint not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update complaint" });
  }
});

app.listen(PORT, () => console.log(`server started at ${PORT}`));
