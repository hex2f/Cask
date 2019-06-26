const Discord = require('discord.js')
const EventEmitter = require('events')

const CommandHandler = require('./commandHandler')

module.exports = class Bot extends EventEmitter {
  constructor (config) {
    super()

    this.commands = new CommandHandler(this, config.commandsPath)
    this.prefix = config.prefix || '>'

    this.client = new Discord.Client()
    this.client.on('ready', () => this.emit('ready'))

    this.client.on('message', (msg) => {
      if (!msg.content.startsWith(this.prefix) || msg.author.bot) return
      const first = msg.content.toLowerCase().split(' ')[0].substr(this.prefix.length)
      this.commands.run(first, msg)
    })

    this.client.login(config.token)
  }
}
