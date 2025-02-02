import axios from 'axios';
import { skills, skillTypes } from '../constants/skills';
import { xpToLevel } from "./xpToLevel";
import { EmbedBuilder } from 'discord.js';
import { clanIcon, emojiIcons, skillIcons } from '../constants/skillIcons';
import { avatarImageLinks } from '../constants/avatarImageLinks';
import { formatDate } from "../utils/formatDate";
import { ClanRank } from "@paintswap/estfor-definitions/types";
import ('dotenv/config');

async function fetchAPI(endpoint: string) {
  const response = await axios.get(`${process.env.ESTFOR_API_URL}/${endpoint}`, { timeout: 10 * 1000 });
  return response.data;
}

async function fetchAllTopRankers() {
  let allRankers: string[] = [];
  for (let skill of skills) {
    let bestAtThisSkill = await fetchAPI(`players?orderBy=${skill.value}XP&orderDirection=desc&numToFetch=1`);
    allRankers.push(`#1 ${bestAtThisSkill?.players[0]?.name} - ${skill.name}`);
  }
  return allRankers;
}

async function awardEmoji(rank: number) {
  if (rank === 1) return ':first_place:';
  if (rank === 2) return ':second_place:';
  if (rank === 3) return ':third_place:';
  if (rank <= 10) return ':medal:';
  return '';
}

async function getPlayerEmbed(player_name: string) {
  let playerData = await fetchAPI(`players?exactName=${player_name}&orderBy=lastTimestamp&orderDirection=desc&numToFetch=1`);
  if (playerData.players.length === 0) {
    playerData = await fetchAPI(`players?name=${player_name}&orderBy=lastTimestamp&orderDirection=desc&numToFetch=1`);
  }
  if (playerData.players.length === 0) return new EmbedBuilder().setTitle('Player not found, try shorten the name you provide.');
  const player = playerData.players[0];

  let clanText = '';
  try {
    const clanData = await fetchAPI(`clan-members/${player.id}`);
    clanText = clanData.clanMember?.clan ? `Clan: ${clanData.clanMember.clan?.name}` : '';
  } catch (error) {
    console.log(error);
  }

  return new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`${player.name} ${await awardEmoji(player.combinedRank)}`)
    .setURL(`${process.env.ESTFOR_GAME_URL}/journal/${player.id}`)
    .setAuthor({ name: `Estfor Player Rank: ${player.combinedRank}`, iconURL: 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png', url: `${process.env.ESTFOR_GAME_URL}/journal/${player.id}` })
    .setDescription(`Total Lvl: ${player.totalLevel} - Total XP: ${Number(player.totalXP).toLocaleString()}
${clanText}
Donated: <:brush_logo_circular:1137068938757423144> ${(Number(player.totalDonated)/ (10 ** 18)).toLocaleString('en-US', { maximumFractionDigits: 1 })}`)
    .setThumbnail(avatarImageLinks[player.avatarId as '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'])
    .addFields([
      {name: `${emojiIcons.melee} Melee`, value: `Lvl: ${await xpToLevel(player.meleeXP)} - Rank: ${player.meleeRank} ${await awardEmoji(player.meleeRank)}`, inline: true},
      {name: `${emojiIcons.ranged} Ranged`, value: `Lvl: ${await xpToLevel(player.rangedXP)} - Rank: ${player.rangedRank} ${await awardEmoji(player.rangedRank)}`, inline: true},
      {name: `${emojiIcons.magic} Magic`, value: `Lvl: ${await xpToLevel(player.magicXP)} - Rank: ${player.magicRank} ${await awardEmoji(player.magicRank)}`, inline: true},
      {name: `${emojiIcons.defence} Defence`, value: `Lvl: ${await xpToLevel(player.defenceXP)} - Rank: ${player.defenceRank} ${await awardEmoji(player.defenceRank)}`, inline: true},
      {name: `${emojiIcons.health} Health`, value: `Lvl: ${await xpToLevel(player.healthXP)} - Rank: ${player.healthRank} ${await awardEmoji(player.healthRank)}`, inline: true},
      {name: `${emojiIcons.woodcutting} Woodcutting`, value: `Lvl: ${await xpToLevel(player.woodcuttingXP)} - Rank: ${player.woodcuttingRank} ${await awardEmoji(player.woodcuttingRank)}`, inline: true},
      {name: `${emojiIcons.firemaking} Firemaking`, value: `Lvl: ${await xpToLevel(player.firemakingXP)} - Rank: ${player.firemakingRank} ${await awardEmoji(player.firemakingRank)}`, inline: true},
      {name: `${emojiIcons.fishing} Fishing`, value: `Lvl: ${await xpToLevel(player.fishingXP)} - Rank: ${player.fishingRank} ${await awardEmoji(player.fishingRank)}`, inline: true},
      {name: `${emojiIcons.cooking} Cooking`, value: `Lvl: ${await xpToLevel(player.cookingXP)} - Rank: ${player.cookingRank} ${await awardEmoji(player.cookingRank)}`, inline: true},
      {name: `${emojiIcons.mining} Mining`, value: `Lvl: ${await xpToLevel(player.miningXP)} - Rank: ${player.miningRank} ${await awardEmoji(player.miningRank)}`, inline: true},
      {name: `${emojiIcons.smithing} Smithing`, value: `Lvl: ${await xpToLevel(player.smithingXP)} - Rank: ${player.smithingRank} ${await awardEmoji(player.smithingRank)}`, inline: true},
      {name: `${emojiIcons.crafting} Crafting`, value: `Lvl: ${await xpToLevel(player.craftingXP)} - Rank: ${player.craftingRank} ${await awardEmoji(player.craftingRank)}`, inline: true},
      {name: `${emojiIcons.thieving} Thieving`, value: `Lvl: ${await xpToLevel(player.thievingXP)} - Rank: ${player.thievingRank} ${await awardEmoji(player.thievingRank)}`, inline: true},
      {name: `${emojiIcons.fletching} Fletching`, value: `Lvl: ${await xpToLevel(player.fletchingXP)} - Rank: ${player.fletchingRank} ${await awardEmoji(player.fletchingRank)}`, inline: true},
      {name: `${emojiIcons.alchemy} Alchemy`, value: `Lvl: ${await xpToLevel(player.alchemyXP)} - Rank: ${player.alchemyRank} ${await awardEmoji(player.alchemyRank)}`, inline: true},
      {name: `${emojiIcons.forging} Forging`, value: `Lvl: ${await xpToLevel(player.forgingXP)} - Rank: ${player.forgingRank} ${await awardEmoji(player.forgingRank)}`, inline: true},
      {name: `${emojiIcons.farming} Farming`, value: `Lvl: ${await xpToLevel(player.farmingXP)} - Rank: ${player.farmingRank} ${await awardEmoji(player.farmingRank)}`, inline: true},
      {name: ` `, value: ` `, inline: true},
    ] as any)
}

async function getClanEmbed(clan_name: string) {
  try {
    let clanData = await fetchAPI(`clans?exactName=${clan_name}&numToFetch=1`);
    if (clanData.clans.length === 0) {
      clanData = await fetchAPI(`clans?name=${clan_name}&orderBy=createdTimestamp&orderDirection=desc&numToFetch=1`);
    }
    if (clanData.clans.length === 0) return new EmbedBuilder().setTitle('Clan not found, try shorten the clan name you provided.');

    const clanMembers = await fetchAPI(`clan-members?clanId=${clanData.clans[0].id}`);

    let leaderNames = [];
    let treasurerNames = [];
    let scoutNames = [];
    let commonerNames = [];

    for (let i = 0; i < clanMembers.clanMembers.length; i++) {
      let member = clanMembers.clanMembers[i];
      let name = member.player.name;
      if (member.rank === ClanRank.LEADER) leaderNames.push(name);
      else if (member.rank === ClanRank.TREASURER) treasurerNames.push(name);
      else if (member.rank === ClanRank.SCOUT) scoutNames.push(name);
      else if (member.rank === ClanRank.COMMONER) commonerNames.push(name);
    }
    let fields = [];
    if (leaderNames.length !== 0) {
      fields.push({name: 'Leaders', value: `${leaderNames.join('\n')}`});
    }
    if (treasurerNames.length !== 0) {
      fields.push({name: 'Treasurers', value: `${treasurerNames.join('\n')}`});
    }
    if (scoutNames.length !== 0) {
      fields.push({name: 'Scouts', value: `${scoutNames.join('\n')}`});
    }
    if (commonerNames.length !== 0) {
      fields.push({name: 'Commoners', value: `${commonerNames.join(', ')}`});
    }

    const clan = clanData.clans[0];
    return new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`${clan.name} ${await awardEmoji(clan.combinedRank)}`)
      .setURL(`${process.env.ESTFOR_GAME_URL}/clans/${clan.id}`)
      .setAuthor({
        name: `Estfor Clan Rank: ${clan.combinedRank}`,
        iconURL: 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png',
        url: `${process.env.ESTFOR_GAME_URL}/clans/${clan.id}`
      })
      .setDescription(' ')
      .setThumbnail(`https://media.estfor.com/clans/images/${clan.imageId}.png`)
      .addFields([
        {name: `Total Lvl`, value: `${Number(clan.totalLevel).toLocaleString('en-US', { maximumFractionDigits: 0 })}`, inline: true},
        {name: `Rank`, value: `${clan.combinedRank} ${await awardEmoji(clan.combinedRank)}`, inline: true},
        {name: `Created`, value: `${formatDate(Number(clan.createdTimestamp) * 1000, false, true)}`, inline: true},
        {name: `Members`, value: `${clan.memberCount} / ${clan.tier.maxMemberCapacity}`, inline: true},
        {name: `Bank Item Value`, value: `<:brush_logo_circular:1137068938757423144> **${(Number(clan.bankValue)/ (10 ** 18)).toLocaleString('en-US', { maximumFractionDigits: 1 })}**`, inline: true},
        {name: `Donated`, value: `<:brush_logo_circular:1137068938757423144> **${(Number(clan.totalDonated)/ (10 ** 18)).toLocaleString('en-US', { maximumFractionDigits: 1 })}**`, inline: true},
        {name: `Owner`, value: `${clan.owner.name}`},
        ...fields
      ] as any)
  } catch (e) {
    console.log(e);
    return new EmbedBuilder().setTitle('Unable to fetch clan data');
  }
}

async function getTop10ClansEmbed() {
  try {
    const clanData = await fetchAPI(`clans?orderDirection=desc&orderBy=totalLevel&numToFetch=10`);
    const clans = clanData.clans;

    const embedBuilder = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Clan Leaderboard`)
      .setURL(`${process.env.ESTFOR_GAME_URL}/leaderboards`)
      .setAuthor({
        name: 'Leaderboard',
        iconURL: 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png',
        url: process.env.ESTFOR_GAME_URL
      })
      .setThumbnail(clanIcon)

    let i = 1;
    let message = '';
    for (const clan of clans) {
      let emoji = ':medal:';
      let nth = 'th';
      if (i === 1) {
        nth = 'st';
        emoji = ':trophy:';
      }
      if (i === 2) {
        nth = 'nd';
        emoji = ':second_place:';
      }
      if (i === 3) {
        nth = 'rd';
        emoji = ':third_place:';
      }
      message += `**${emoji}** ${clan.name} - Lvl  ${(Number(clan.totalLevel) / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })}k - Members: ${clan.memberCount} - <:brush_logo_circular:1137068938757423144> ${(Number(clan.bankValue) / (10 ** 18)).toLocaleString('en-US', {maximumFractionDigits: 0})} \n`
      i++;
    }
    embedBuilder.addFields({name: ' ', value: message} as any);
    return embedBuilder;
  } catch (e) {
    console.log(e);
    return new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Clan Leaderboard`)
      .setURL(`${process.env.ESTFOR_GAME_URL}/leaderboards`)
      .setAuthor({
        name: 'Leaderboard',
        iconURL: 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png',
        url: process.env.ESTFOR_GAME_URL
      })
      .setThumbnail(clanIcon)
      .addFields({name: 'Error creating the list', value: 'Sorry, please contact us or bare with us while we fix it.'} as any);
  }
}

async function getTop10ClanDonationsEmbed() {
  try {
    const clanData = await fetchAPI(`clans?orderDirection=desc&orderBy=totalDonated&numToFetch=10`);
    const clans = clanData.clans;

    const embedBuilder = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Clan Donation Leaderboard <:brush_logo_circular:1137068938757423144>`)
      .setURL(`${process.env.ESTFOR_GAME_URL}/leaderboards`)
      .setAuthor({
        name: 'Leaderboard',
        iconURL: 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png',
        url: process.env.ESTFOR_GAME_URL
      })
      .setThumbnail(clanIcon)

    let i = 1;
    let message = '';
    for (const clan of clans) {
      let emoji = ':medal:';
      let nth = 'th';
      if (i === 1) {
        nth = 'st';
        emoji = ':trophy:';
      }
      if (i === 2) {
        nth = 'nd';
        emoji = ':second_place:';
      }
      if (i === 3) {
        nth = 'rd';
        emoji = ':third_place:';
      }
      if (Number(clan.totalDonated) <= 0) {
        continue;
      }
      message += `**${emoji}** ${clan.name} - ${(Number(clan.totalDonated)/ (10 ** 18)).toLocaleString('en-US', { maximumFractionDigits: 0 })} \n`
      i++;
    }
    embedBuilder.addFields({name: ' ', value: message} as any);
    return embedBuilder;
  } catch (e) {
    console.log(e);
    return new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Clan Donations Leaderboard`)
      .setURL(`${process.env.ESTFOR_GAME_URL}/leaderboards`)
      .setAuthor({
        name: 'Leaderboard',
        iconURL: 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png',
        url: process.env.ESTFOR_GAME_URL
      })
      .setThumbnail(clanIcon)
      .addFields({name: 'Clan donation list would go here, but currently an error', value: '**:trophy:** PaintSwap - Donated  100,000'} as any);
  }
}

async function getTop10DonationsEmbed(showPlayers: boolean  ) {
  try {
    const donationsData = await fetchAPI(`donations?useUsers=${!showPlayers}&orderDirection=desc&orderBy=donationAmountRank&numToFetch=10`);
    const donations = donationsData.donations;

    const embedBuilder = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Donations Leaderboard`)
      .setURL(`${process.env.ESTFOR_GAME_URL}/leaderboards`)
      .setAuthor({
        name: 'Leaderboard',
        iconURL: 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png',
        url: process.env.ESTFOR_GAME_URL
      })
      .setThumbnail(clanIcon)

    let i = 1;
    let message = '';
    for (const donation of donations) {
      let emoji = ':medal:';
      let nth = 'th';
      if (i === 1) {
        nth = 'st';
        emoji = ':trophy:';
      }
      if (i === 2) {
        nth = 'nd';
        emoji = ':second_place:';
      }
      if (i === 3) {
        nth = 'rd';
        emoji = ':third_place:';
      }
      const donationAmount = (Number(donation.amount)/ (10 ** 18)).toLocaleString('en-US', { maximumFractionDigits: 0 })
      message += `**${emoji}** ${donation.user ? donation.user : donation.player.name} - ${donationAmount} \n`
      i++;
    }
    embedBuilder.addFields({name: ' ', value: message} as any);
    return embedBuilder;
  } catch (e) {
    console.log(e);
    return new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`Donation Leaderboard`)
      .setURL(`${process.env.ESTFOR_GAME_URL}/leaderboards`)
      .setAuthor({
        name: 'Leaderboard',
        iconURL: 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png',
        url: process.env.ESTFOR_GAME_URL
      })
      .setThumbnail(clanIcon)
      .addFields({name: 'Donation list would go here', value: '**:trophy:** PaintSwap - 10,000'} as any);
  }
}

async function getLeaderboardEmbed(skill: skillTypes) {
  const orderBySkill = skill === 'combined' ? 'combinedRank' : `${skill}XP`;
  const leaderBoardData = await fetchAPI(`players?orderBy=${orderBySkill}&orderDirection=desc&numToFetch=10`);
  let skillCapitalize = skill.charAt(0).toUpperCase() + skill.slice(1);
  if (skillCapitalize === 'Combined') skillCapitalize = 'Combined Level';
  if (skillCapitalize === 'Total') skillCapitalize = 'Total XP';
  const embedBuilder = new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle(`${skillCapitalize}`)
  .setURL(`${process.env.ESTFOR_GAME_URL}/leaderboard`)
  .setAuthor({ name: 'Leaderboard', iconURL: 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png', url: process.env.ESTFOR_GAME_URL })
  .setThumbnail(skillIcons[skill])

  let i = 1;
  let message = '';
  for (const player of leaderBoardData.players) {
    const playerJournalUrl = `${process.env.ESTFOR_GAME_URL}/journal/${player.id}`;
    const lvlToDisplay = skill === 'combined' ? player[`totalLevel`] : await xpToLevel(player[`${skill}XP`]);
    const xp = skill === 'combined' ? player[`totalXP`] : player[`${skill}XP`];

    const xpToDisplay = xp > 1000000
      ? `${(xp / 1000000).toLocaleString('en-US', { maximumFractionDigits: 2 })}M`
      : `${(xp / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 })}k`;

    let emoji = ':medal:';
    let nth = 'th';
    if (i === 1) { nth = 'st'; emoji = ':trophy:'; }
    if (i === 2) { nth = 'nd'; emoji = ':second_place:'; }
    if (i === 3) { nth = 'rd'; emoji = ':third_place:'; }
    if (skill === 'total') {
      message += `**${emoji}** [${player.name}](${playerJournalUrl}) - ${xpToDisplay} \n`
    } else {
      message += `**${emoji}** Lvl ${lvlToDisplay} - [${player.name}](${playerJournalUrl}) - XP ${xpToDisplay} \n`
    }
    i++;
  }
  embedBuilder.addFields({name: ' ', value: message} as any);
  return embedBuilder;
}

async function getGlobalStatsEmbed() {
  const globalPlayerStats = await fetchAPI(`global-player-stats`);
  const globalUserStats = await fetchAPI(`global-user-stats`);
  const globalClanStats = await fetchAPI(`global-clan-stats`);
  const globalDonationStats = await fetchAPI(`global-donation-stats`);
  return new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle('Global Stats')
  .setURL(`${process.env.ESTFOR_GAME_URL}`)
  .setAuthor({ name: 'Stats', iconURL: 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png', url: process.env.ESTFOR_GAME_URL })
  .setThumbnail('https://cdn.discordapp.com/attachments/1062650591827984415/1081214164296548373/logo_trans_noLights_2000.png')
  .addFields([
    {name: 'Total', value: `Heroes: **${Number(globalPlayerStats.globalPlayerStats.totalPlayers).toLocaleString('en-US', { maximumFractionDigits: 0 })}**
Users: **${Number(globalUserStats.globalUserStats.totalUsers).toLocaleString('en-US', { maximumFractionDigits: 0 })}**
Clans: **${Number(globalClanStats.globalClanStats.totalClans).toLocaleString('en-US', { maximumFractionDigits: 0 })}**
Clan Members: **${Number(globalClanStats.globalClanStats.totalClanMembers).toLocaleString('en-US', { maximumFractionDigits: 0 })}** \n\n 
    `},
    {name: 'Brush', value: `Burned: **${(Number(globalUserStats.globalUserStats.totalBrushBurned)/ (10 ** 18)).toLocaleString('en-US', { maximumFractionDigits: 0 })}**
Spent in shop: **${(Number(globalUserStats.globalUserStats.totalBought)/ (10 ** 18)).toLocaleString('en-US', { maximumFractionDigits: 0 })}**
Sold to shop: **${(Number(globalUserStats.globalUserStats.totalSold)/ (10 ** 18)).toLocaleString('en-US', { maximumFractionDigits: 0 })}**
Donated: **${(Number(globalDonationStats.globalDonationStats.totalDonatedAmount)/ (10 ** 18)).toLocaleString('en-US', { maximumFractionDigits: 0 })}**
    `},
  ] as any);
}

export { fetchAllTopRankers, getPlayerEmbed, getLeaderboardEmbed, getGlobalStatsEmbed, getTop10ClansEmbed, getTop10DonationsEmbed, getTop10ClanDonationsEmbed, getClanEmbed };