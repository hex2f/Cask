module.exports.GenericEmbed = (title, description, options = {}) => ({
  embed: {
    color: 0x66ddff,
    title,
    description,
    ...options
  }
})

module.exports.SuccessEmbed = (title, description, options = {}) => ({
  embed: {
    color: 0x55ee77,
    title,
    description,
    ...options
  }
})

module.exports.WarningEmbed = (title, description, options = {}) => ({
  embed: {
    color: 0xffdd66,
    title,
    description,
    ...options
  }
})

module.exports.GenericErrorEmbed = (description, options = {}) => ({
  embed: {
    color: 0xff6666,
    title: 'Something went wrong',
    description,
    ...options
  }
})

module.exports.SyntaxErrorEmbed = (usage, options = {}) => ({
  embed: {
    color: 0xff6666,
    title: 'Invalid Syntax',
    description: [
      '**Example Usage:**',
      usage
    ].join('\n'),
    ...options
  }
})
