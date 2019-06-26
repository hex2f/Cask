const Bot = require('./lib')
const config = require('./config.json')

const VM = new (require('./vm'))()

const mongoose = require('mongoose')
const { Script } = require('./models')

mongoose.connect(`mongodb://${config.db.addr}`, { auth: { authSource: 'admin' }, user: config.db.user, pass: config.db.pass, useNewUrlParser: true })

const bot = new Bot(config)

bot.on('command', async ({ key, msg }) => {
  let script = await Script.findOne({
    guild: msg.guild.id,
    key: key
  })

  if (!script) return

  VM.run({ msg }, script.code)
})
