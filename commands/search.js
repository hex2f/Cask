const { Cask } = require('@lib/models')
const { GenericEmbed, WarningEmbed } = require('@lib/embeds')

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'search'
  }

  async trigger (msg) {
    let query = msg.content.split(' ').slice(1).join(' ')
    let results = await Cask.find({ $text: { $search: query } }).sort({ score: -1 }).limit(5)
    if (results.length === 0) return msg.channel.send(WarningEmbed('No Results.', `Couldn't find any casks for that search. Try something else.`))
    return msg.channel.send(GenericEmbed('Cask Search', 'Here are some results for your search, sorted by score.', {
      fields: results.map(cask => ({ name: `${msg.prefix}${cask.key}`, value: `${cask.description}\n[${cask.score} Votes]` }))
    }))
  }
}
