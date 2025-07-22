const mongoose = require("mongoose");
/////////////////user///////////////////////////////
const userSchema = mongoose.Schema({
  name: { type: String, required: 'Name is require' },
  email: { type: String, required: 'Email is require' },
  password: { type: String, required: 'Password is require' },
  phone: { type: Number, required: 'Phone is require' }, 
  userType: { type: String, required: 'UserType is require' },
},
{
  timestamps: true,
});
const UserSchema = mongoose.model("user_Schema", userSchema);

///////////////complaint///////////////////
const complaintSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "user_Schema" },
  name: {type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true }, 
  comment: { type: String, required: true },
  status: { type: String, required: true },
});

const ComplaintSchema = mongoose.model("complaint_schema", complaintSchema)

///////////assigned complaint schema////////////////////////
const assignedComplaint = mongoose.Schema({
  agentId : {type: mongoose.Schema.Types.ObjectId, required: true, ref: "user_Schema" },
  complaintId : {type: mongoose.Schema.Types.ObjectId, required: true, ref: "complaint_schema" },
  status: {type: String, required: true },
  agentName: {type: String, required: true },
})

const AssignedComplaint = mongoose.model("assigned_complaint",assignedComplaint)

////////////////////chatWindow schema/////////////////////////
const messageSchema = new mongoose.Schema({
  name: {type: String, required: 'name is required'},
  message: {type: String, required: 'message is required'},
  complaintId: {type: mongoose.Schema.Types.ObjectId, ref: "assigned_complaint"}
}, { timestamps: true });

const MessageSchema = mongoose.model('message', messageSchema);

module.exports = {
  UserSchema,
  ComplaintSchema,
  AssignedComplaint,
  MessageSchema,
};