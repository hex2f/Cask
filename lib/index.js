const Discord = require('discord.js')
const EventEmitter = require('events')

const { Prefix, Grant } = require('@lib/models')
const { GenericErrorEmbed } = require('@lib/embeds')

const CommandHandler = require('./commandHandler')

module.exports = class Bot extends EventEmitter {
  constructor (config) {
    super()

    this.commands = new CommandHandler(this, config.commandsPath)
    this.prefix = config.prefix || '>'

    this.client = new Discord.Client()
    this.client.on('ready', () => this.emit('ready'))
    this.ratelimits = {}

    this.client.on('message', async (msg) => {
      let prefix = (await Prefix.findOne({ guild: (msg.guild || msg.channel).id }) || {}).prefix || this.prefix
      if (!msg.content.startsWith(prefix) || msg.author.bot) return
      let first = msg.content.toLowerCase().split(' ')[1]

      let key = msg.content.toLowerCase().substr(prefix.length).split(' ')[0]

      msg.prefix = prefix
      if (msg.content.startsWith(prefix + 'cask')) {
        msg.content = msg.content.split(' ').slice(1).join(' ')
        key = msg.content.split(' ')[0]
      }

      if (msg.guild &&
        msg.guild.ownerID !== msg.author.id &&
        ['invite', 'help', 'search', 'top', 'vote'].indexOf(key) === -1 &&
        !(await Grant.findOne({ guild: msg.guild.id, role: { $in: msg.member.roles.map(role => role.id) }, key: { $in: [key, 'all'] } }))
      ) {
        return msg.channel.send(GenericErrorEmbed(`:raised_hand: You don't have permission to run that command. Ask the server owner to grant this command to you using \`${prefix}cask permission ${key} grant ${msg.member.highestRole.name}\``, 'Permission Denied'))
      }

      this.commands.run(first, msg)
    })

    this.client.on('rateLimit', (rateLimit) => {
      let path = rateLimit.path.split('/')
      this.client.rest.handlers[rateLimit.path].destroy()

      let i = 0
      while (isNaN(parseInt(path[i])) && i < path.length) { i++ }

      let guild
      try { guild = this.bot.client.channels.get(path[i]) } catch (e) {}
      try { if (!guild) guild = this.bot.client.guilds.find(g => g.channels.has(path[i])) } catch (e) {}
      try { if (!guild) guild = this.bot.client.guilds.get(path[i]) } catch (e) {}

      if (guild) {
        this.ratelimits[guild.id] = (this.ratelimits[guild.id] || 0) + 1
        if (this.ratelimits[guild.id] >= 3) {
          this.ratelimits[guild.id] = 0
          try { guild.owner.send(`Left \`${guild.name}\`, too many ratelimits.\nUse \`>invite\` to get a new invite.`) } catch (e) {}
          try { guild.leave() } catch (e) {}
        }
      }
    })

    this.client.login(config.token)
  }
}
