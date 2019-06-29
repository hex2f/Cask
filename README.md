![Cask Header](https://i.imgur.com/Z0uGcfV.png)
## What is it?
Cask is a unique Discord bot that lets you create entirely custom commands using JavaScript. It's very simple to use, you just write your code in a code block where you have access to the Discord.JS message object, fetch and the NodeJS crypto api. You can also install cool commands others have published using [>cask install](https://github.com/RekkyRek/cask/blob/master/docs/install.md) or publish your own commands using [>cask publish](https://github.com/RekkyRek/cask/blob/master/docs/publish.md).

## How does it work?
Every time a message is sent with the selected prefix in the beginning of the message, `>` by default, it looks up any stored commands for your server.
If it finds any matching commands, it instantiates a new JavaScript virtual machine which has the following variables in its global scope:

| Variable Name                                                  | Description                                                   |
|----------------------------------------------------------------|---------------------------------------------------------------|
| [msg](https://discord.js.org/#/docs/main/stable/class/Message) | The Discord.JS message object.                                |
| [fetch](https://www.npmjs.com/package/node-fetch)              | An instance of node-fetch, so you can interact with APIs etc. |
| [crypto](https://nodejs.org/api/crypto.html)                   | The NodeJS crypto API.                                        |

## Commands
| Command                                                                             | Description                                        |
|-------------------------------------------------------------------------------------|----------------------------------------------------|
| [>cask new](https://github.com/RekkyRek/cask/blob/master/docs/new.md)               | Create a new local command.                        |
| [>cask install](https://github.com/RekkyRek/cask/blob/master/docs/install.md)       | Install a command.                                 |
| [>cask remove](https://github.com/RekkyRek/cask/blob/master/docs/remove.md)         | Remove a command.                                  |
| [>cask list](https://github.com/RekkyRek/cask/blob/master/docs/list.md)             | List all installed commands.                       |
| [>cask vote](https://github.com/RekkyRek/cask/blob/master/docs/vote.md)             | Show your appreciation for a cask by voting.       |
| [>cask search](https://github.com/RekkyRek/cask/blob/master/docs/search.md)         | Search for a cask.                                 |
| [>cask top](https://github.com/RekkyRek/cask/blob/master/docs/top.md)               | Shows you the top voted casks.                     |
| [>cask publish](https://github.com/RekkyRek/cask/blob/master/docs/publish.md)       | Publish one of your local commands.                |
| [>cask unpublish](https://github.com/RekkyRek/cask/blob/master/docs/unpublish.md)   | Unpublish one of your casks.                       |
| [>cask permission](https://github.com/RekkyRek/cask/blob/master/docs/permission.md) | Manage who can use what.                           |
