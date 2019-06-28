const { Cask, Vote } = require('@lib/models')
const { GenericErrorEmbed, WarningEmbed } = require('@lib/embeds')
const parseKey = key => key.toLowerCase().replace(/[^a-z0-9_-]/g, '').split(' ')[0]

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'vote'
  }

  async trigger (msg) {
    let key = parseKey(msg.content.split(' ')[1] || '')
    let cask = await Cask.findOne({ key })
    if (!cask) {
      return msg.channel.send(GenericErrorEmbed(`I couldn't find the cask \`${msg.prefix}${key}\`. Make sure your spelling is correct! You can browse casks using \`${msg.prefix}cask\`.`, `Cask Not Found`))
    }

    let voted = await Vote.findOne({ uid: msg.author.id, timeout: { $gt: Date.now() } })
    if (voted) {
      let distance = voted.timeout - Date.now()

      let hh = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      let mm = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      let ss = Math.floor((distance % (1000 * 60)) / 1000)

      return msg.channel.send(WarningEmbed(`Timeout!`, `You can only vote once every 12 hours.\nTime Remaining: \`${hh}:${mm}:${ss}\``))
    }

    await Vote.create({ uid: msg.author.id, timeout: new Date(Date.now() + (1000 * 60 * 60 * 12)) })
    await cask.update({ $inc: { score: 1 } })
  }
}
