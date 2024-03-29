import dotenv from 'dotenv'
import { Client, GatewayIntentBits, ActivityType, Interaction } from 'discord.js';

import {
  fetchAllTopRankers,
  getLeaderboardEmbed,
  getPlayerEmbed,
  getGlobalStatsEmbed,
  getTop10ClansEmbed,
  getTop10DonationsEmbed,
  getTop10ClanDonationsEmbed,
  getClanEmbed,
} from './model/fetchAPI';
import { skillTypes, skills } from './constants/skills';
import { createCommandsMessage } from './model/info';
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  if (process.env.CYCLE_THROUGH_NUMBER_1S_IN_BOT_TITLE !== 'false') {
    let topRankers: string[] = [];
    fetchAllTopRankers().then((data) => {
      topRankers = data;
    });
    setInterval(function () {
      fetchAllTopRankers().then((data) => {
        topRankers = data;
      });
    }, 1000 * 60 * 60
    )
    let max = skills.length;
    let i = 0
    setInterval(function () {
      if (!topRankers) {
        return;
      }
      if (!topRankers[i]) {
        if (i > max) {
          i = 0;
        } else {
          i++;
        }
        return;
      }
      client.user?.setPresence({
        activities: [{name: topRankers[i], type: ActivityType.Playing}],
        status: 'online',
      });
      i++;
    }, 20000);
  }
  console.log('Bot is ready');
});

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  if (commandName === 'leaderboard') {
    const embed = await getLeaderboardEmbed(interaction.options.get("skill")?.value as skillTypes);
    await interaction.reply({ embeds: [embed] });
  } else if (commandName === 'player') {
    const embed = await getPlayerEmbed(interaction.options.get("name")?.value as string);
    await interaction.reply({ embeds: [embed] });
  } else if (commandName === 'clan') {
    const embed = await getClanEmbed(interaction.options.get("name")?.value as string);
    await interaction.reply({ embeds: [embed] });
  } else if (commandName === 'top-clans') {
    const embed = await getTop10ClansEmbed();
    await interaction.reply({embeds: [embed]});
  }  else if (commandName === 'top-clan-donations') {
    const embed = await getTop10ClanDonationsEmbed();
    await interaction.reply({embeds: [embed]});
  } else if (commandName === 'top-donations') {
      const embed = await getTop10DonationsEmbed(Boolean(interaction.options.get('show_by_players')?.value));
      await interaction.reply({ embeds: [embed] });
  } else if (commandName === 'global-stats') {
    const embed = await getGlobalStatsEmbed();
    await interaction.reply({ embeds: [embed] });
  } else if (commandName === 'list-commands') {
    await interaction.reply(await createCommandsMessage());
  } else {
    await interaction.reply('This command is not recognised, sorry about that');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);