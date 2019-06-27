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
        { name: '>cask new <command> <code block>', value: 'Create a new local command.' },
        { name: '>cask install <command>', value: 'Install a command.' },
        { name: '>cask delete <command>', value: 'Delete a command.' },
        { name: '>cask vote <command>', value: 'Show your appreciation for a cask by voting.' },
        { name: '>cask search <query>', value: 'Search for a cask.' },
        { name: '>cask top <*category>', value: 'Shows you the top voted casks, category is optional.' },
        { name: '>cask publish <command>', value: 'Publish one of your local commands.' },
        { name: '>cask unpublish <command>', value: 'Unpublish one of your casks.\n*Users that have installed your cask will still have it installed.*' }
      ]
    }))
  }
}
