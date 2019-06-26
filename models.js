const mongoose = require('mongoose')

export const Script = mongoose.model('scripts', {
  guild: { type: String, required: true },
  key: { type: String, required: true },
  code: { type: String, required: true }
})
