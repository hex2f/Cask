const { Cask, Script } = require('@lib/models')
const Collector = require('@lib/collector')
const { GenericEmbed, SuccessEmbed, GenericErrorEmbed, WarningEmbed } = require('@lib/embeds')
const parseKey = key => key.toLowerCase().replace(/[^a-z0-9_-]/g, '').split(' ')[0]

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'install'
  }

  async trigger (msg) {
    let key = parseKey(msg.content.split(' ')[1] || '')
    let cask = await Cask.findOne({ key })
    if (!cask) {
      return msg.channel.send(GenericErrorEmbed(`I couldn't find the cask \`${msg.prefix}${key}\`. Make sure your spelling is correct! You can browse casks using \`${msg.prefix}cask top\`.`, `Cask Not Found`))
    }

    let script = await Script.findOne({ guild: (msg.guild || msg.channel).id, key })

    if (script) {
      let updateMsg = await msg.channel.send(WarningEmbed(`Update ${msg.prefix}${key}?`, `\`${msg.prefix}${key}\` is already installed. Do you want to update it?\n(yes/no)`))
      let shouldUpdate = (await Collector(msg.channel, msg.author.id)).content.toLowerCase().indexOf('yes') > -1
      updateMsg.delete()
      if (!shouldUpdate) return msg.channel.send(GenericEmbed('Canceled.', 'The cask was already installed and an update wasn\'t approved.'))

      await script.update({ code: cask.code })
    } else {
      await Script.create({ guild: (msg.guild || msg.channel).id, key: cask.key, code: cask.code })
    }

    return msg.channel.send(SuccessEmbed(`Installed ${msg.prefix}${cask.key}`, `:tada: Successfully installed the cask \`${msg.prefix}${cask.key}\`.`))
  }
}
