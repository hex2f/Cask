const { Cask } = require('@lib/models')
const { GenericEmbed, WarningEmbed } = require('@lib/embeds')

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'search'
  }

  async trigger (msg) {
    let query = msg.content.split(' ').slice(1).join(' ')
    console.log(query)
    let results = await Cask.find({ $text: { $search: query } }).sort({ score: -1 })
    if (results.length === 0) return msg.channel.send(WarningEmbed('No Results.', `Couldn't find any casks for that search. Try something else.`))
    return msg.channel.send(GenericEmbed('The Cask Command', 'Browse through and install community made commands.', {
      fields: results.map(cask => ({ name: `>${cask.key}`, value: `${cask.description}\n[${cask.score} Votes]` }))
    }))
  }
}
