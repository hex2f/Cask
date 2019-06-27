const { Script } = require('@lib/models')
const { SuccessEmbed, GenericErrorEmbed, SyntaxErrorEmbed } = require('@lib/embeds')

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'new'
  }

  async trigger (msg) {
    let key
    try {
      key = msg.content
        .split(' ')[1].split('\n')[0].split('```')[0]
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '')
    } catch (e) {}

    let code
    try {
      code = (/```[a-z]*\n([\s\S]*?\n)```/gm).exec(msg.content)[1]
    } catch (e) {}

    if (!key || !code) {
      return msg.channel.send(SyntaxErrorEmbed([
        '>new CommandTrigger ```js',
        'let something = "hello there!"',
        'msg.reply(something)',
        '```', '', `To find out more about commands, use \`${msg.prefix}cask help new\``
      ].join('\n')))
    }

    try {
      let script = await Script.findOne({
        guild: (msg.guild || msg.channel).id,
        key
      })

      if (script) {
        await script.update({ code })
        return msg.channel.send(SuccessEmbed(`Updated ${msg.prefix}${key}`, `Successfully updated the command "${msg.prefix}${key}".`))
      } else {
        await Script.create({
          guild: (msg.guild || msg.channel).id,
          key,
          code
        })
        return msg.channel.send(SuccessEmbed(`Created ${msg.prefix}${key}`, `Successfully created the command "${msg.prefix}${key}".`))
      }
    } catch (e) {
      return msg.channel.send(GenericErrorEmbed(`Try again later.`))
    }
  }
}
