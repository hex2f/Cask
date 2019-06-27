const mongoose = require('mongoose')

module.exports.Script = mongoose.model('scripts', {
  guild: { type: String, required: true },
  key: { type: String, required: true },
  code: { type: String, required: true }
})

module.exports.StoreItem = mongoose.model('storeitems', {
  key: { type: String, required: true },
  authorID: { type: String, required: true },
  authorTag: { type: String, required: true },
  description: { type: String },
  code: { type: String, required: true }
})
