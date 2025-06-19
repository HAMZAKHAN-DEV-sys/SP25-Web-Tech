
const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  userEmail: String,
  address: String,
  items: Array,
  total: Number,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', OrderSchema);
