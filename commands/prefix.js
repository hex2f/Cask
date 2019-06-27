const { Prefix } = require('@lib/models')
const { SuccessEmbed } = require('@lib/embeds')

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'prefix'
  }

  async trigger (msg) {
    let prefix = msg.content.split(' ')[1].toLowerCase()
    let guildPrefix = await Prefix.findOne({ guild: (msg.guild || msg.author).id })
    if (guildPrefix) {
      await guildPrefix.update({ prefix })
    } else {
      await Prefix.create({ guild: (msg.guild || msg.author).id, prefix })
    }

    msg.channel.send(SuccessEmbed('Prefix Changed', `Successfully set the prefix to \`${prefix}\``))
  }
}
