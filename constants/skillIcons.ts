import type { skillTypes } from "./skills";

const skillIcons: {
  [key in skillTypes]: string;
} = {
  'crafting': 'https://cdn.discordapp.com/attachments/1062650591827984415/1090924886551183360/crafting.png',
  'fishing': 'https://cdn.discordapp.com/attachments/1062650591827984415/1090924886039466125/fishing.png',
  'cooking': 'https://cdn.discordapp.com/attachments/1062650591827984415/1090924886270160985/cooking.png',
  'defence': 'https://cdn.discordapp.com/attachments/968897451589263370/1158720827810906113/defence_1.png',
  'firemaking': 'https://cdn.discordapp.com/attachments/1062650591827984415/1090924886945443902/firemaking.png',
  'health' : 'https://cdn.discordapp.com/attachments/1062650591827984415/1090924938011099156/health.png',
  'magic' : 'https://cdn.discordapp.com/attachments/1062650591827984415/1130430001016217670/magic_hat.png',
  'melee' : 'https://cdn.discordapp.com/attachments/1062650591827984415/1090924938380185680/melee.png',
  'mining' : 'https://cdn.discordapp.com/attachments/1062650591827984415/1090924938631856169/mining.png',
  'smithing': 'https://cdn.discordapp.com/attachments/1062650591827984415/1090924938879324213/smithing.png',
  'thieving': 'https://cdn.discordapp.com/attachments/1062650591827984415/1090924939139354644/thieving.png',
  'woodcutting': 'https://cdn.discordapp.com/attachments/1062650591827984415/1090924939361665044/woodcutting.png',
  'combined': 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png', // Need a total logo
  'total': 'https://cdn.discordapp.com/attachments/1062650591827984415/1081201265083691028/ek_logo.png', // Need a total logo
  'fletching': 'https://cdn.discordapp.com/attachments/1062650591827984415/1128985061170085918/fletching.png',
  'ranged': 'https://cdn.discordapp.com/attachments/1062650591827984415/1129014533021773884/ranged.png',
  'alchemy': 'https://cdn.discordapp.com/attachments/1062650591827984415/1128985033877757972/alchemy.png',
  'forging': 'https://estfor.com/images/game/menu/forging.png',
}

const clanIcon = 'https://cdn.discordapp.com/attachments/935109648053321751/1102977837373325442/clan.png';

const emojiIcons = {
  'crafting': '<:EKS_crafting:1092925578807607397>',
  'fishing': '<:EKS_fishing:1092925414583840861>',
  'cooking': '<:EKS_cooking:1092925487023652874>',
  'defence': '<:EKS_defense:1101098606041235547>',
  'firemaking': '<:EKS_firemaking:1092925738803527710>',
  'health' : '<:EKS_health:1092925797746090028>',
  'magic' : '<:EKS_magic:1130430171992838196>',
  'melee' : '<:EKS_melee:1092925934438457345>',
  'mining' : '<:EKS_mining:1092925991036395570>',
  'smithing': '<:EKS_smithing:1092926049190420501>',
  'thieving': '<:EKS_thieving:1092926121118552095>',
  'woodcutting': '<:EKS_woodcutting:1092926186172199014>',
  'total': '<:EKS_crown:1100086364462133300>',
  'fletching': '<:EKS_Fletching:1129013719133851658>',
  'ranged': '<:EKS_Ranged:1129016059433852968>',
  'alchemy': '<:EKS_Alchemy:1129013383581143070>',
  'forging': '<:EKS_forging:1185676034348163102>',
}

export { skillTypes, skillIcons, emojiIcons, clanIcon }