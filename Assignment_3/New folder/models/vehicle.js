const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true, enum: ['sedan', 'SUV', 'truck', 'other'] },
    image: { type: String }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
