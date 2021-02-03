const mongoose = require('mongoose');

const scannedSchema = new mongoose.Schema({
  userRef: {type: String, required: true, unique: true},
  scanData:[[]],
  forUrl: {type: String, requred: true, unique: false},
  scanType: { type: String, required: true},
});

let ScannedData;

module.exports = ScannedData = mongoose.model('scannedData', scannedSchema);
