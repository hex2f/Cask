module.exports.GenericEmbed = (title, description, options = {}) => ({
  embed: {
    color: 0x32a0e5,
    author: {
      name: title,
      icon_url: 'https://cdn.discordapp.com/app-assets/593852428626165760/593854065776132097.png'
    },
    description,
    ...options
  }
})

module.exports.SuccessEmbed = (title, description, options = {}) => ({
  embed: {
    color: 0x32e554,
    author: {
      name: title,
      icon_url: 'https://cdn.discordapp.com/app-assets/593852428626165760/593854065398513706.png'
    },
    description,
    ...options
  }
})

module.exports.WarningEmbed = (title, description, options = {}) => ({
  embed: {
    color: 0xe5a032,
    author: {
      name: title,
      icon_url: 'https://cdn.discordapp.com/app-assets/593852428626165760/593854065729994762.png'
    },
    description,
    ...options
  }
})

module.exports.GenericErrorEmbed = (description, title = 'Something went wrong', options = {}) => ({
  embed: {
    color: 0xe84040,
    author: {
      name: title,
      icon_url: 'https://cdn.discordapp.com/app-assets/593852428626165760/593854065239261193.png'
    },
    description,
    ...options
  }
})

module.exports.SyntaxErrorEmbed = (usage, options = {}) => ({
  embed: {
    color: 0xe84040,
    author: {
      name: 'Invalid Syntax',
      icon_url: 'https://cdn.discordapp.com/app-assets/593852428626165760/593854065239261193.png'
    },
    description: [
      '**Example Usage:**',
      usage
    ].join('\n'),
    ...options
  }
})
