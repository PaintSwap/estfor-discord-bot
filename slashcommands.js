const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { skills } = require('./constants/skills.js');
dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('See the top 10 players')
    .addStringOption(option => option
      .setName('skill')
      .setDescription('Which skill do you want to see the leaderboard on')
      .setRequired(true)
      .addChoices(...skills)
    ),
  new SlashCommandBuilder()
    .setName('player')
    .setDescription('View a player')
    .addStringOption(option => option
      .setName('name')
      .setDescription('Will retrieve the player that best matches the name you provide.')
      .setRequired(true)
    ),
].map(command => command.toJSON());

const rest = new REST({version: '10'}).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {body: commands});

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
