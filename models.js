const mongoose = require('mongoose')

module.exports.Script = mongoose.model('scripts', {
  guild: { type: String, required: true },
  key: { type: String, required: true },
  code: { type: String, required: true }
})
