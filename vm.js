module.exports = class VM {
  constructor () {
    this.fetch = require('node-fetch')
  }

  run (sandbox, code) {
    new VM({
      sandbox: {
        ...sandbox,
        fetch: this.fetch
      },
      timeout: 2500
    }).run(code)
  }
}
