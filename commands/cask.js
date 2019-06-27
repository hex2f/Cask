const { Cask } = require('../models')
const { GenericEmbed, GenericErrorEmbed } = require('../embeds')

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'cask'
    this.categories = { 0: 'General', 1: 'Moderation', 2: 'Utility', 3: 'Fun', 4: 'Social' }
  }

  async install (msg) {

  }

  async help (msg) {
    return msg.channel.send(GenericEmbed('The Cask Command', 'Browse through and install community made commands.', {
      fields: [
        { name: 'Categories', value: Object.values(this.categories).map(c => `\`${c}\``).join(' ') },
        { name: '>cask install <command>', value: 'Install a command.' },
        { name: '>cask search <query>', value: 'Search for a cask.' },
        { name: '>cask top <*category>', value: 'Shows you the top voted casks, category is optional.' },
        { name: '>cask publish', value: 'Publish one of your own commands.' }
      ]
    }))
  }

  async trigger (msg) {
    try {
      switch (msg.content.split(' ')[1]) {
        case 'install':
          this.install(msg)
          break
        default:
          this.help(msg)
      }
    } catch (e) {
      return msg.channel.send(GenericErrorEmbed('Try again later.'))
    }
  }
}
