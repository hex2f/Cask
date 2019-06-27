const fetch = require('node-fetch')
const crypto = require('crypto')

const { VM } = require('vm2')

module.exports = class DVM {
  run (msg, code) {
    let vm = new VM({
      sandbox: {},
      timeout: 2500
    })

    vm.freeze(msg, 'msg')
    vm.freeze(fetch, 'fetch')
    vm.freeze(crypto, 'crypto')

    vm.run(code)
  }
}
