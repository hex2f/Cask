const { GenericEmbed } = require('@lib/embeds')
const categories = { 0: 'General', 1: 'Moderation', 2: 'Utility', 3: 'Fun', 4: 'Social' }

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'help'
  }

  async trigger (msg) {
    return msg.channel.send(GenericEmbed('Cask', 'Cask is a unique Discord bot that lets you create your own commands using real JavaScript, right from the comfort of your chatbox.', {
      fields: [
        { name: 'Categories', value: Object.values(categories).map(c => `\`${c}\``).join(' ') },
        { name: msg.prefix + 'cask new <command> <code block>', value: 'Create a new local command.' },
        { name: msg.prefix + 'cask install <command>', value: 'Install a command.' },
        { name: msg.prefix + 'cask delete <command>', value: 'Delete a command.' },
        { name: msg.prefix + 'cask vote <command>', value: 'Show your appreciation for a cask by voting.' },
        { name: msg.prefix + 'cask search <query>', value: 'Search for a cask.' },
        { name: msg.prefix + 'cask top <*category>', value: 'Shows you the top voted casks, category is optional.' },
        { name: msg.prefix + 'cask publish <command>', value: 'Publish one of your local commands.' },
        { name: msg.prefix + 'cask unpublish <command>', value: 'Unpublish one of your casks.\n*Users that have installed your cask will still have it installed.*' }
      ]
    }))
  }
}
