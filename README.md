# Estfor Discord Bot
## Setup
### Prerequistes
- Node.js v18.14.0
- NPM v9.3.1

### Installation
- `npm install`
- `cp .env.dist .env`
- Fill in environment variables with your bot credentials. If you don't have discord bot credentials you can create a discord bot application here: https://discord.com/developers/applications
- `npm run build`

### Start the bot
- `node dist/bot.js`

### Publish/Update slash commands
- `node slashcommands.js`