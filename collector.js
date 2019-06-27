const { MessageCollector } = require('discord.js')

module.exports = (channel, author) => {
  return new Promise((resolve) => {
    const collector = new MessageCollector(channel, msg => msg.author.id === author, { time: 30000 })
    collector.on('collect', (msg) => {
      resolve(msg)
      collector.stop()
      msg.delete()
    })
  })
}
