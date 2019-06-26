const fs = require('fs')
const path = require('path')

class CommandHandler {
  constructor (parent, path = process.cwd() + '/commands') {
    this.parent = parent
    this.path = path
    this.commands = {}

    this.install()
    this.run = this.run.bind(this)
  }

  async install () {
    fs.readdirSync(this.path).forEach(file => {
      try {
        let command = new (require(path.resolve(this.path, file)))(this.parent)
        if (!command.key || !command.trigger) { return }
        this.commands[command.key] = command
      } catch (e) {
        console.error(`Tried parsing "${file}" but encountered an error.`, e)
      }
    })
  }

  run (key, msg) {
    this.commands[key] && this.commands[key].trigger(msg)
  }
}

module.exports = CommandHandler
