const { GenericEmbed } = require('@lib/embeds')
const categories = { 0: 'General', 1: 'Moderation', 2: 'Utility', 3: 'Fun', 4: 'Social' }
const parseKey = key => key.toLowerCase().replace(/[^a-z0-9_-]/g, '').split(' ')[0]

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'help'
  }

  async trigger (msg) {
    let key = parseKey(msg.content.split(' ')[1] || '')
    if (key.length > 0 && ['new', 'install', 'delete', 'vote', 'search', 'top', 'publish', 'unpublish', 'permission'].indexOf(key) > -1) {
      return msg.channel.send(GenericEmbed(key, `[Documentation for ${msg.prefix}${key}](https://github.com/RekkyRek/Cask/blob/master/docs/${key}.md)`))
    }
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
        { name: msg.prefix + 'cask unpublish <command>', value: 'Unpublish one of your casks.\n*Users that have installed your cask will still have it installed.*' },
        { name: msg.prefix + 'cask permission <command> <grant/revoke> <role name>', value: 'Manage who can use what.' }
      ]
    }))
  }
}
