const { Script } = require('../models')
const { SuccessEmbed, GenericErrorEmbed, SyntaxErrorEmbed, WarningEmbed } = require('../embeds')

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'remove'
  }

  async trigger (msg) {
    let key
    try {
      key = msg.content
        .split(' ')[1]
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '')
    } catch (e) {}

    if (!key) return msg.channel.send(SyntaxErrorEmbed('>remove CommandTrigger'))

    try {
      let script = await Script.findOne({
        guild: msg.guild.id,
        key
      })

      if (script) {
        await script.remove()
        return msg.channel.send(SuccessEmbed(`Removed >${key}`, `Successfully removed the command ">${key}".`))
      } else {
        return msg.channel.send(WarningEmbed(`Command not found.`, `I couldn't find the command "${key}". Use \`>list\` to see all your installed commands.`))
      }
    } catch (e) {
      return msg.channel.send(GenericErrorEmbed('Try again later.'))
    }
  }
}
