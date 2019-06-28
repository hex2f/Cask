const { Grant } = require('@lib/models')
const { GenericEmbed, SuccessEmbed, GenericErrorEmbed, SyntaxErrorEmbed } = require('@lib/embeds')
const parseKey = key => key.toLowerCase().replace(/[^a-z0-9_-]/g, '').split(' ')[0]

module.exports = class {
  constructor (bot) {
    this.bot = bot
    this.key = 'permission'
  }

  async trigger (msg) {
    try {
      let key = parseKey(msg.content.split(' ')[1] || '')
      let action = parseKey(msg.content.split(' ')[2] || '')
      let role = msg.guild.roles.find(role => role.name === msg.content.split(' ').slice(3).join(' '))
      if (!role) role = msg.guild.roles.find(role => role.id === msg.content.split(' ').slice(3).join(' '))

      if (key.length === 0 ||
        !role ||
        ['grant', 'revoke'].indexOf(action) === -1
      ) return msg.channel.send(SyntaxErrorEmbed(`${msg.prefix}cask permission <command> <grant/revoke> <role name>`))

      let dbquery = {
        guild: (msg.guild || msg.channel).id,
        role: role.id,
        key
      }

      let grant = await Grant.findOne(dbquery)

      if (grant && action === 'grant') return msg.channel.send(GenericEmbed('Already Granted', 'This command has already been granted to that role.'))
      if (!grant && action === 'revoke' && key !== 'all') return msg.channel.send(GenericEmbed('Not Granted', 'This command has not been granted to that role.'))

      if (action === 'grant') {
        await Grant.create(dbquery)
        return msg.channel.send(SuccessEmbed('Permission Granted!', `:ok_hand: <@&${role.id}> has been granted the permission to use \`${key}\``))
      } else {
        if (key === 'all') {
          await Grant.remove({ guild: (msg.guild || msg.channel).id, role: role.id })
        } else {
          await Grant.findOneAndRemove(dbquery)
        }
        return msg.channel.send(SuccessEmbed('Permission Revoked!', `:ok_hand: Revoked the permission for <@&${role.id}> to use \`${key}\``))
      }
    } catch (e) {
      console.log(e)
      return msg.channel.send(GenericErrorEmbed('Try again later.'))
    }
  }
}
