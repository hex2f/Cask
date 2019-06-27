const { Script } = require('../models')
const { GenericEmbed, GenericErrorEmbed, WarningEmbed } = require('../embeds')

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'list'
  }

  async trigger (msg) {
    try {
      let scripts = await Script.find({
        guild: msg.guild.id
      })

      if (scripts.length > 0) {
        return msg.channel.send(GenericEmbed(
          `Installed Commands`,
          scripts.map(script => `>${script.key}`).join('\n')
        ))
      } else {
        return msg.channel.send(WarningEmbed(`No installed commands.`, `You don't have any commands. Make your own using \`>new\`, or browse commands made by the community using \`>cask\` `))
      }
    } catch (e) {
      return msg.channel.send(GenericErrorEmbed('Try again later.'))
    }
  }
}
