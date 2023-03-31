const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const dotenv = require('dotenv');
const { fetchAllTopRankers, createLeaderBoardMessage, createPlayerStatsMessage} = require('./model/fetchAPI');
const { skills } = require('./constants/skills');
dotenv.config();

client.on('ready', () => {
  let topRankers = [];
  fetchAllTopRankers().then((data) => {
    topRankers = data;
  });
  setInterval(function() {
      fetchAllTopRankers().then((data) => {
        topRankers = data;
      });
    }, 1000 * 60 * 60
  )
  let max = skills.length;
  let i = 0
  setInterval(function() {
    if (!topRankers) { return; }
    if (!topRankers[i]) { if(i > max) { i = 0; } else { i++; } return; }
    client.user.setPresence({
      activities: [{ name: topRankers[i], type: ActivityType.Playing }],
      status: 'active',
    });
    i++;
  }, 20000);
  console.log('Bot is ready');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  if (commandName === 'leaderboard') {
    await interaction.reply(await createLeaderBoardMessage(interaction.options.get("skill")?.value));
  } else if (commandName === 'player') {
    const playerName = interaction.options.get("name")?.value;
    await interaction.reply(await createPlayerStatsMessage(playerName));
  } else {
    await interaction.reply('This command is not recognised, sorry about that');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);