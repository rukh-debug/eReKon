const mongoose = require('mongoose');

const scannedSchema = new mongoose.Schema({
  userRef: {type: String, required: true, unique: true},
  scanData:[[]],
});

let ScannedData;

module.exports = ScannedData = mongoose.model('scannedData', scannedSchema);
