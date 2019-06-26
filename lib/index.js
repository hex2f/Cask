const Discord = require('discord.js')
const EventEmitter = require('events')

module.exports = class Bot extends EventEmitter {
  constructor (config) {
    super(config)

    this.commands = {}

    this.prefix = config.prefix || '>'

    this.client = new Discord.Client()
    this.client.on('ready', () => this.emit('ready'))

    this.client.on('message', (msg) => {
      if (!msg.content.startsWith(this.prefix) || msg.author.bot) return
      const first = msg.content.toLowerCase().split(' ')[0].substr(this.prefix.length)
      console.log(first)
    })

    this.client.login(config.token)
  }
}
