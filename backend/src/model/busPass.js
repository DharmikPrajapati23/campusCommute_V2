const mongoose = require("mongoose");


const busPassSchema = new mongoose.Schema({
  // New simplified schema
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  enrollmentNo: { type: String, required: true, index: true }, // Changed from unique to index
  name: { type: String, required: true },
  college: { type: String },
  branch: { type: String },
  semester: { type: String },
  stand: { type: String },
  city: { type: String },
  
  // Payment info
  issueDate: { type: Date },
  expiryDate: { type: Date },
  paymentRef: { type: String }, // razorpay paymentId
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  
  // Additional fields for compatibility with form
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  parentPhone: { type: String },
  bloodGroup: { type: String },
  note: { type: String },
  feeAmount: { type: Number },
  regNo: { type: String },
  date: { type: Date },
  shift: { type: String },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Ensure indexes are properly set
busPassSchema.index({ enrollmentNo: 1 });

module.exports = mongoose.model("BusPass", busPassSchema);