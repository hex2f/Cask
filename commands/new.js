const { Script } = require('../models')

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'new'
  }

  async trigger (msg) {
    let key = msg.content
      .split(' ')[1].split('\n')[0].split('```')[0]
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '')

    let code = (/```[a-z]*\n([\s\S]*?\n)```/gm).exec(msg.content)[1]

    if (!key || !code) {
      return msg.channel.send({
        embed: {
          color: 0xff6666,
          title: 'Invalid Syntax',
          description: [
            '**Example Usage:**',
            '>new CommandTrigger \\```',
            'let something = "hello there!"',
            'msg.reply(some)',
            '```'
          ].join('\n')
        }
      })
    }

    try {
      let script = await Script.findOne({
        guild: msg.guild.id,
        key
      })

      if (script) {
        await script.update({ code })
        return msg.channel.send({
          embed: {
            color: 0x55ee77,
            title: `Updated >${key}`,
            description: `Successfully updated the command ">${key}".`
          }
        })
      } else {
        await Script.create({
          guild: msg.guild.id,
          key,
          code
        })
        return msg.channel.send({
          embed: {
            color: 0x55ee77,
            title: `Created >${key}`,
            description: `Successfully created the command ">${key}".`
          }
        })
      }
    } catch (e) {
      return msg.channel.send({
        embed: {
          color: 0xff6666,
          title: 'Something went wrong',
          description: 'Try again later.'
        }
      })
    }
  }
}
