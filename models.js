const mongoose = require('mongoose')

module.exports.Script = mongoose.model('scripts', {
  guild: { type: String, required: true },
  key: { type: String, required: true },
  code: { type: String, required: true }
})

module.exports.Cask = mongoose.model('casks', {
  key: { type: String, required: true },
  authorID: { type: String, required: true },
  authorTag: { type: String, required: true },
  description: { type: String, default: 'No description' },
  category: { type: Number, default: 0 },
  code: { type: String, required: true }
})
