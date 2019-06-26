module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'hello'
  }

  trigger (msg) {
    msg.reply('Hello There!')
  }
}
