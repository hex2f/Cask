const fetch = require('node-fetch')
const crypto = require('crypto')

const { VM } = require('vm2')

module.exports = class DVM {
  run (sandbox, code) {
    new VM({
      sandbox: {
        ...sandbox,
        fetch,
        crypto
      },
      timeout: 2500
    }).run(code)
  }
}
