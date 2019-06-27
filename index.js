require('module-alias/register') // lets me do requrie('@lib/bla') :)

const Bot = require('@lib')
const config = require('./config.json')
const { GenericErrorEmbed } = require('@lib/embeds')

const VM = new (require('@lib/vm'))()

const mongoose = require('mongoose')
const { Script } = require('@lib/models')

mongoose.connect(`mongodb://${config.db.addr}`, { auth: { authSource: 'admin' }, user: config.db.user, pass: config.db.pass, useNewUrlParser: true })

const bot = new Bot(config)

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
