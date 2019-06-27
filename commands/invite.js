module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'invite'
  }

  async trigger (msg) {
    try {
      msg.author.send(`https://discordapp.com/oauth2/authorize?client_id=593852428626165760&scope=bot&permissions=8`)
    } catch (e) {
      msg.reply(`https://discordapp.com/oauth2/authorize?client_id=593852428626165760&scope=bot&permissions=8`)
    }

    msg.delete()
  }
}
