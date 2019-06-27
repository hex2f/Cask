const Bot = require('./lib')
const config = require('./config.json')
const { GenericErrorEmbed } = require('./embeds')

const VM = new (require('./vm'))()

const mongoose = require('mongoose')
const { Script } = require('./models')

mongoose.connect(`mongodb://${config.db.addr}`, { auth: { authSource: 'admin' }, user: config.db.user, pass: config.db.pass, useNewUrlParser: true })

const bot = new Bot(config)

let ratelimits = {}

bot.client.on('rateLimit', (rateLimit) => {
  let path = rateLimit.path.split('/')
  bot.client.rest.handlers[rateLimit.path].destroy()

  let i = 0
  while (isNaN(parseInt(path[i])) && i < path.length) { i++ }

  let guild
  try { guild = bot.client.channels.get(path[i]) } catch (e) {}
  try { if (!guild) guild = bot.client.guilds.find(g => g.channels.has(path[i])) } catch (e) {}
  try { if (!guild) guild = bot.client.guilds.get(path[i]) } catch (e) {}

  if (guild) {
    ratelimits[guild.id] = (ratelimits[guild.id] || 0) + 1
    if (ratelimits[guild.id] >= 3) {
      ratelimits[guild.id] = 0
      try { guild.owner.send(`Left \`${guild.name}\`, too many ratelimits.\nUse \`>invite\` to get a new invite.`) } catch (e) {}
      try { guild.leave() } catch (e) {}
    }
  }
})

bot.on('command', async ({ key, msg }) => {
  let script = await Script.findOne({
    guild: (msg.guild || msg.channel).id,
    key: key
  })

  if (!script) return

  try {
    VM.run(msg, script.code)
  } catch (e) {
    try { msg.channel.send(GenericErrorEmbed(e.message)) } catch (e) { }
  }
})
