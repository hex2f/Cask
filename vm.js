const fetch = require('node-fetch')

const { VM } = require('vm2')

module.exports = class DVM {
  run (sandbox, code) {
    new VM({
      sandbox: {
        ...sandbox,
        fetch
      },
      timeout: 2500
    }).run(code)
  }
}
