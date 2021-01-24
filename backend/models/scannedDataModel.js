const mongoose = require('mongoose');

const scannedSchema = new mongoose.Schema({
  userRef: {type: String, required: true, unique: true},
  scanData:[[]],
  forUrl: {type: String, requred: true, unique: false},
});

let ScannedData;

module.exports = ScannedData = mongoose.model('scannedData', scannedSchema);
