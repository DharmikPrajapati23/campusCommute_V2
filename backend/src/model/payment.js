const mongoose = require("mongoose");


const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderId: { type: String, required: true },
  paymentId: { type: String },
  status: { type: String, default: "created" },
  amount: { type: Number },
  currency: { type: String },
  receipt: { type: String },
  notes: { type: Object },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Payment", paymentSchema);