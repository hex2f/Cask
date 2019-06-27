const { Cask, Script } = require('../models')
const Collector = require('../collector')
const { GenericEmbed, SuccessEmbed, GenericErrorEmbed, WarningEmbed } = require('../embeds')

const parseKey = key => key.toLowerCase().replace(/[^a-z0-9_-]/g, '').split(' ')[0]

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'cask'
    this.categories = { 0: 'General', 1: 'Moderation', 2: 'Utility', 3: 'Fun', 4: 'Social' }
  }

  async install (msg) {
    let key = parseKey(msg.content.split(' ')[2] || '')
    let cask = await Cask.findOne({ key })
    if (!cask) {
      return msg.channel.send(GenericErrorEmbed(`I couldn't find the cask \`>${key}\`. Make sure your spelling is correct! You can browse casks using \`>cask\`.`, `Cask Not Found`))
    }

    let script = await Script.findOne({ guild: msg.guild.id, key })

    if (script) {
      let updateMsg = msg.channel.send(WarningEmbed(`Update >${key}?`, `\`>${key}\` is already installed. Do you want to update it?\n(yes/no)`))
      let shouldUpdate = (await Collector(msg.channel, msg.author.id)).content.toLowerCase().indexOf('yes')
      updateMsg.delete()
      if (!shouldUpdate) return msg.channel.send(GenericEmbed('Canceled.', 'The cask was already installed and an update wasn\'t approved.'))

      await script.update({ code: cask.code })
    } else {
      await Script.create({ guild: msg.guild.id, key: cask.key, code: cask.code })
    }

    return msg.channel.send(SuccessEmbed(`Installed >${cask.key}`, `:tada: Successfully installed the cask \`>${cask.key}\`.`))
  }

  async publish (msg) {
    let key = parseKey(msg.content.split(' ')[2] || '')
    let script = await Script.findOne({ guild: msg.guild.id, key })
    if (!script) {
      return msg.channel.send(GenericErrorEmbed(`I couldn't find the command \`>${key}\`. Make sure your spelling is correct! You can see your installed commands using \`>list\`.`))
    }

    let instruction = await msg.channel.send(GenericEmbed(
      'Publish a Cask',
      `You've selected the command \`>${key}\`, what would you like this command to be published as? (This has to be a unique name)\nYou can at any time type \`exit\` to cancel the creation of this cask.`))
    let newKey = parseKey((await Collector(msg.channel, msg.author.id)).content)
    if (newKey === 'exit') return

    while (await Cask.findOne({ key: newKey }) || newKey.length < 1) {
      instruction.delete()
      instruction = await msg.channel.send(WarningEmbed('Already in use', `The name \`>${newKey}\` is already in use. Please pick another name or type \`exit\` to cancel the creation of this cask.`))
      newKey = parseKey((await Collector(msg.channel, msg.author.id)).content)
      if (newKey === 'exit') return
    }

    instruction.delete()
    instruction = await msg.channel.send(GenericEmbed('Publish a Cask', `\`>${newKey}\`, great name! So, what type of command is this?`, {
      fields: [{ name: 'Available Categories', value: Object.values(this.categories).map((c, i) => `\`${i} - ${c}\``).join('\n') }]
    }))
    let category = (await Collector(msg.channel, msg.author.id)).content
    if (category === 'exit') return
    category = parseInt(category)

    while (isNaN(category) || !this.categories[category]) {
      instruction.delete()
      instruction = await msg.channel.send(WarningEmbed('Invalid Category', `I couldn't find that category. Please pick one from the alternatives below.`, {
        fields: [{ name: 'Available Categories', value: Object.values(this.categories).map((c, i) => `\`${i} - ${c}\``).join('\n') }]
      }))
      let category = (await Collector(msg.channel, msg.author.id)).content
      if (category === 'exit') return
      category = parseInt(category)
    }

    instruction.delete()
    instruction = await msg.channel.send(GenericEmbed('Publish a Cask', `So, how do you use this command and what does it do?`, {
      footer: 'Max 150 characters.'
    }))
    let description = (await Collector(msg.channel, msg.author.id, 360000)).content.substr(0, 150).replace(/@/gm, '__@__')
    if (description === 'exit') return

    instruction.delete()
    instruction = await msg.channel.send(GenericEmbed('Publish a Cask', `Alright! Make sure everything is correct and write \`publish\` when you're ready, or exit to cancel.`, {
      fields: [
        { name: 'Selected Command', value: `\`${key}\`` },
        { name: 'Published Name', value: `\`${newKey}\`` },
        { name: 'Category', value: `\`${category} - ${this.categories[category]}\`` },
        { name: 'Description', value: `\`${description}\`` }
      ]
    }))

    let action = (await Collector(msg.channel, msg.author.id, 360000)).content
    while (action !== 'publish') {
      if (action === 'exit') return
      action = (await Collector(msg.channel, msg.author.id)).content
    }
    instruction.delete()
    try {
      await Cask.create({
        key: newKey,
        authorID: msg.author.id,
        authorTag: `${msg.author.username}#${msg.author.discriminator}`,
        description,
        category,
        code: script.code
      })

      instruction = await msg.channel.send(SuccessEmbed('Published!', ':tada: Hooray! Your cask has been published!'))
    } catch (e) {
      instruction = await msg.channel.send(GenericErrorEmbed('Try again later.'))
    }
  }

  async unpublish (msg) {
    let key = parseKey(msg.content.split(' ')[2])
    let cask = await Cask.findOne({ key })
    if (!cask) return msg.channel.send(GenericErrorEmbed(`I couldn't find the cask \`>${key}\`. Make sure your spelling is correct.`, `Cask Not Found`))
    if (cask.authorID !== msg.author.id) return msg.channel.send(GenericErrorEmbed(`You don't own \`>${key}\`. Therefore you can't unpublish it.`, `Permission Denied`))
    try {
      await cask.delete()
      return msg.channel.send(SuccessEmbed(`Unpublished >${key}`, `:ok_hand: Successfully unpublished the cask \`>${key}\``))
    } catch (e) {
      await msg.channel.send(GenericErrorEmbed('Try again later.'))
    }
  }

  async help (msg) {
    return msg.channel.send(GenericEmbed('The Cask Command', 'Browse through and install community made commands.', {
      fields: [
        { name: 'Categories', value: Object.values(this.categories).map(c => `\`${c}\``).join(' ') },
        { name: '>cask install <command>', value: 'Install a command.' },
        { name: '>cask search <query>', value: 'Search for a cask.' },
        { name: '>cask top <*category>', value: 'Shows you the top voted casks, category is optional.' },
        { name: '>cask publish <command>', value: 'Publish one of your own commands.' },
        { name: '>cask unpublish <command>', value: 'Unpublish one of your casks.\n*Users that have installed your cask will still have it installed.*' }
      ]
    }))
  }

  async trigger (msg) {
    try {
      switch (msg.content.split(' ')[1]) {
        case 'install':
          this.install(msg)
          break
        case 'publish':
          this.publish(msg)
          break
        case 'unpublish':
          this.unpublish(msg)
          break
        default:
          this.help(msg)
      }
    } catch (e) {
      return msg.channel.send(GenericErrorEmbed('Try again later.'))
    }
  }
}
