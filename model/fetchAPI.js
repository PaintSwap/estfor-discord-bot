const axios = require('axios');
const { skills } = require("../constants/skills");
const { xpToLevel } = require("./xpToLevel");

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

async function createPlayerStatsMessage(player_name) {
  try {
    const playerData = await fetchAPI(`players?name=${player_name}&orderBy=lastTimestamp&orderDirection=desc&numToFetch=1`);
    if (playerData.players.length === 0) return 'Player not found, try shorten the name you provide.';
    const player = playerData.players[0];
    let message = `**${player.name}**\n\n`;
    message += `Rank: ${player.combinedRank} - TotalXP: ${player.totalXP}\n`;
    message += `**Woodcutting** Rank: ${player.woodcuttingRank} - Lvl: ${await xpToLevel(player.totalXP)}\n`;
    message += `**Firemaking** Rank: ${player.firemakingRank} - Lvl: ${await xpToLevel(player.firemakingXP)}\n`;
    message += `**Fishing** Rank: ${player.fishingRank} - Lvl: ${await xpToLevel(player.fishingXP)}\n`;
    message += `**Cooking** Rank: ${player.cookingRank} - Lvl: ${await xpToLevel(player.cookingXP)}\n`;
    message += `**Mining** Rank: ${player.miningRank} - Lvl: ${await xpToLevel(player.miningXP)}\n`;
    message += `**Smithing** Rank: ${player.smithingRank} - Lvl: ${await xpToLevel(player.smithingXP)}\n`;
    message += `**Crafting** Rank: ${player.craftingRank} - Lvl: ${await xpToLevel(player.craftingXP)}\n`;
    message += `**Thieving** Rank: ${player.thievingRank} - Lvl: ${await xpToLevel(player.thievingXP)}\n`;
    message += `**Melee** Rank: ${player.meleeRank} - Lvl: ${await xpToLevel(player.meleeXP)}\n`;
    message += `**Magic** Rank: ${player.magicRank} - Lvl: ${await xpToLevel(player.magicXP)}\n`;
    message += `**Defence** Rank: ${player.defenceRank} - Lvl: ${await xpToLevel(player.defenceXP)}\n`;
    message += `**Health** Rank: ${player.healthRank} - Lvl: ${await xpToLevel(player.healthXP)}\n`;
    return message;
  } catch (err) {
    console.log(err);
    return 'Sorry an error occurred fetching the player\'s data.';
  }
}

async function createLeaderBoardMessage(skill) {
  const leaderBoardData = await fetchAPI(`players?orderBy=${skill}XP&orderDirection=desc&numToFetch=10`);
  let skillCapitalize = skill.charAt(0).toUpperCase() + skill.slice(1);
  if (skillCapitalize === 'Total') skillCapitalize = 'Overall';
  let message = `**${skillCapitalize} Leaderboard**\n\n`;
  let i = 1;
  for (const player of leaderBoardData.players) {
    let nth = 'th';
    if (i === 1) nth = 'st';
    if (i === 2) nth = 'nd';
    if (i === 3) nth = 'rd';
    message += `**${i}${nth}**: `;
    message += 'Lvl '+ await xpToLevel(player[`${skill}XP`]) + ' - ' + player.name + '\n';
    i++;
  }
  return message;
}

module.exports = { fetchAllTopRankers, createPlayerStatsMessage, createLeaderBoardMessage };