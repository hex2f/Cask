const { Cask } = require('@lib/models')
const { GenericErrorEmbed, SuccessEmbed } = require('@lib/embeds')
const parseKey = key => key.toLowerCase().replace(/[^a-z0-9_-]/g, '').split(' ')[0]

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'unpublish'
  }

  async trigger (msg) {
    let key = parseKey(msg.content.split(' ')[2])
    let cask = await Cask.findOne({ key })
    if (!cask) return msg.channel.send(GenericErrorEmbed(`I couldn't find the cask \`${msg.prefix}${key}\`. Make sure your spelling is correct.`, `Cask Not Found`))
    if (cask.authorID !== msg.author.id) return msg.channel.send(GenericErrorEmbed(`You don't own \`${msg.prefix}${key}\`. Therefore you can't unpublish it.`, `Permission Denied`))
    try {
      await cask.delete()
      return msg.channel.send(SuccessEmbed(`Unpublished ${msg.prefix}${key}`, `:ok_hand: Successfully unpublished the cask \`${msg.prefix}${key}\``))
    } catch (e) {
      await msg.channel.send(GenericErrorEmbed('Try again later.'))
    }
  }
}
