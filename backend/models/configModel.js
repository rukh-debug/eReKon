const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  userRef: {type: String, required: true, unique: true},
  scanType: {type: String, required: true}
});

let Config;

module.exports = Config = mongoose.model('config', configSchema);

