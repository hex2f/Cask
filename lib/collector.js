const { MessageCollector } = require('discord.js')

module.exports = (channel, author, time = 30000) => {
  return new Promise((resolve) => {
    const collector = new MessageCollector(channel, msg => msg.author.id === author, { time })
    collector.on('collect', (msg) => {
      resolve(msg)
      collector.stop()
      msg.delete()
    })
  })
}
