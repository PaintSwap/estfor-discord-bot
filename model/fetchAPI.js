const axios = require('axios');
const { skills } = require("../constants/skills");
const { xpToLevel } = require("./xpToLevel");
const { EmbedBuilder } = require('discord.js');
const { emojiIcons, skillIcons} = require("../constants/skillIcons");
const { avatarImageLinks } = require("../constants/avatarImageLinks");
const dotenv = require('dotenv');
dotenv.config();

async function fetchAPI(endpoint) {
  const response = await axios.get(`${process.env.ESTFOR_API_URL}/${endpoint}`, { timeout: 10 * 1000 });
  return response.data;
}

async function fetchAllTopRankers() {
  let allRankers = [];
  for (let skill of skills) {
    let bestAtThisSkill = await fetchAPI(`players?orderBy=${skill.value}XP&orderDirection=desc&numToFetch=1`);
    allRankers.push(`#1 ${bestAtThisSkill.players[0].name} - ${skill.name}`);
  }
  return allRankers;
}

async function awardEmoji(rank) {
  if (rank === 1) return ':first_place:';
  if (rank === 2) return ':second_place:';
  if (rank === 3) return ':third_place:';
  if (rank <= 10) return ':medal:';
  return '';
}

async function getPlayerEmbed(player_name) {
  const playerData = await fetchAPI(`players?name=${player_name}&orderBy=lastTimestamp&orderDirection=desc&numToFetch=1`);
  if (playerData.players.length === 0) return new EmbedBuilder().setTitle('Player not found, try shorten the name you provide.');
  const player = playerData.players[0];
  return new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle(`${player.name} ${await awardEmoji(player.combinedRank)}`)
  .setURL(`${process.env.ESTFOR_GAME_URL}/journal/${player.id}`)
  .setAuthor({ name: `Estfor Player Rank: ${player.combinedRank}`, iconURL: 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png', url: `${process.env.ESTFOR_GAME_URL}/journal/${player.id}` })
  .setDescription(`TotalXP: ${player.totalXP} - Overall Lvl: ${await xpToLevel(player.totalXP)}`)
  .setThumbnail(avatarImageLinks[player.avatarId])
  .addFields([
    {name: `${emojiIcons.melee} Melee`, value: `Lvl: ${await xpToLevel(player.meleeXP)}\nRank: ${player.meleeRank} ${await awardEmoji(player.meleeRank)}`, inline: true},
    {name: `${emojiIcons.magic} Magic`, value: `Lvl: ${await xpToLevel(player.magicXP)}\nRank: ${player.magicRank} ${await awardEmoji(player.magicRank)}`, inline: true},
    {name: `${emojiIcons.defence} Defence`, value: `Lvl: ${await xpToLevel(player.defenceXP)}\nRank: ${player.defenceRank} ${await awardEmoji(player.defenceRank)}`, inline: true},
    {name: `${emojiIcons.health} Health`, value: `Lvl: ${await xpToLevel(player.healthXP)}\nRank: ${player.healthRank} ${await awardEmoji(player.healthRank)}`, inline: true},
    {name: `${emojiIcons.woodcutting} Woodcutting`, value: `Lvl: ${await xpToLevel(player.woodcuttingXP)}\nRank: ${player.woodcuttingRank} ${await awardEmoji(player.woodcuttingRank)}`, inline: true},
    {name: `${emojiIcons.firemaking} Firemaking`, value: `Lvl: ${await xpToLevel(player.firemakingXP)}\nRank: ${player.firemakingRank} ${await awardEmoji(player.firemakingRank)}`, inline: true},
    {name: `${emojiIcons.fishing} Fishing`, value: `Lvl: ${await xpToLevel(player.fishingXP)}\nRank: ${player.fishingRank} ${await awardEmoji(player.fishingRank)}`, inline: true},
    {name: `${emojiIcons.cooking} Cooking`, value: `Lvl: ${await xpToLevel(player.cookingXP)}\nRank: ${player.cookingRank} ${await awardEmoji(player.cookingRank)}`, inline: true},
    {name: `${emojiIcons.mining} Mining`, value: `Lvl: ${await xpToLevel(player.miningXP)}\nRank: ${player.miningRank} ${await awardEmoji(player.miningRank)}`, inline: true},
    {name: `${emojiIcons.smithing} Smithing`, value: `Lvl: ${await xpToLevel(player.smithingXP)}\nRank: ${player.smithingRank} ${await awardEmoji(player.smithingRank)}`, inline: true},
    {name: `${emojiIcons.crafting} Crafting`, value: `Lvl: ${await xpToLevel(player.craftingXP)}\nRank: ${player.craftingRank} ${await awardEmoji(player.craftingRank)}`, inline: true},
    {name: `${emojiIcons.thieving} Thieving`, value: `Lvl: ${await xpToLevel(player.thievingXP)}\nRank: ${player.thievingRank} ${await awardEmoji(player.thievingRank)}`, inline: true}
  ])
}

async function getLeaderboardEmbed(skill) {
  const leaderBoardData = await fetchAPI(`players?orderBy=${skill}XP&orderDirection=desc&numToFetch=10`);
  let skillCapitalize = skill.charAt(0).toUpperCase() + skill.slice(1);
  if (skillCapitalize === 'Total') skillCapitalize = 'Overall';

  const embedBuilder = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle(`${skillCapitalize}`)
  .setURL(`${process.env.ESTFOR_GAME_URL}/leaderboards`)
  .setAuthor({ name: 'Leaderboard', iconURL: 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png', url: process.env.ESTFOR_GAME_URL })
  .setThumbnail(skillIcons[skill])

  let i = 1;
  let message = '';
  for (const player of leaderBoardData.players) {
    let emoji = ':medal:';
    let nth = 'th';
    if (i === 1) { nth = 'st'; emoji = ':trophy:'; }
    if (i === 2) { nth = 'nd'; emoji = ':second_place:'; }
    if (i === 3) { nth = 'rd'; emoji = ':third_place:'; }
    message += `**${emoji}** Lvl ${await xpToLevel(player[`${skill}XP`])} - ${player.name} \n`
    i++;
  }
  embedBuilder.addFields({name: ' ', value: message});
  return embedBuilder;
}

async function getGlobalStatsEmbed() {
  const globalPlayerStats = await fetchAPI(`global-player-stats`);
  const globalUserStats = await fetchAPI(`global-user-stats`);
  return new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle('Global Stats')
  .setURL(`${process.env.ESTFOR_GAME_URL}`)
  .setAuthor({ name: 'Stats', iconURL: 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png', url: process.env.ESTFOR_GAME_URL })
  .setThumbnail('https://cdn.discordapp.com/attachments/1062650591827984415/1081214164296548373/logo_trans_noLights_2000.png')
  .addFields([
    {name: 'Total Players', value: globalPlayerStats.globalPlayerStats.totalPlayers},
    {name: 'Total Users', value: globalUserStats.globalUserStats.totalUsers},
    {name: 'Brush Burned', value: `${(Number(globalUserStats.globalUserStats.totalBrushBurned)/ (10 ** 18)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`},
    {name: 'Brush In', value: `${(Number(globalUserStats.globalUserStats.totalBought)/ (10 ** 18)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`},
    {name: 'Brush Out', value: `${(Number(globalUserStats.globalUserStats.totalSold)/ (10 ** 18)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`},
  ]);
}

module.exports = { fetchAllTopRankers, getPlayerEmbed, getLeaderboardEmbed, getGlobalStatsEmbed };