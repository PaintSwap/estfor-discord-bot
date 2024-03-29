const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { skills } = require('./dist/constants/skills.js');
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
  new SlashCommandBuilder()
    .setName('clan')
    .setDescription('View a clan')
    .addStringOption(option => option
      .setName('name')
      .setDescription('Will retrieve the clan that best matches the name you provide.')
      .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('global-stats')
    .setDescription('View global stats'),
  new SlashCommandBuilder()
    .setName('top-clans')
    .setDescription('View top clans'),
  new SlashCommandBuilder()
    .setName('top-clan-donations')
    .setDescription('View top clan donations'),
  new SlashCommandBuilder()
    .setName('top-donations')
    .setDescription('View top donations')
    .addBooleanOption(option => option
      .setName('show_by_players')
      .setDescription('True will show players, false will show leaderboard by user wallets')
      .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('list-commands')
    .setDescription('View a list of all available commands'),
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
