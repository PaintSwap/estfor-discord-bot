import type { skillTypes } from "./skills";

const baseImagePath = 'https://github.com/PaintSwap/estfor-discord-bot/tree/main/images/';
const imageParams = '?raw=true';

const skillIcons: {
  [key in skillTypes]: string;
} = {
  'crafting': `${baseImagePath}crafting.png${imageParams}`,
  'fishing': `${baseImagePath}fishing.png${imageParams}`,
  'cooking': `${baseImagePath}cooking.png${imageParams}`,
  'defence': `${baseImagePath}defence.png${imageParams}`,
  'firemaking': `${baseImagePath}firemaking.png${imageParams}`,
  'health' : `${baseImagePath}health.png${imageParams}`,
  'magic' : `${baseImagePath}magic_hat.png${imageParams}`,
  'melee' : `${baseImagePath}melee.png${imageParams}`,
  'mining' : `${baseImagePath}mining.png${imageParams}`,
  'smithing': `${baseImagePath}smithing.png${imageParams}`,
  'thieving': `${baseImagePath}thieving.png${imageParams}`,
  'woodcutting': `${baseImagePath}woodcutting.png${imageParams}`,
  'combined': `${baseImagePath}all.png${imageParams}`,
  'total': `${baseImagePath}all.png${imageParams}`,
  'fletching': `${baseImagePath}fletching.png${imageParams}`,
  'ranged': `${baseImagePath}ranged.png${imageParams}`,
  'alchemy': `${baseImagePath}alchemy.png${imageParams}`,
  'forging': `${baseImagePath}forging.png${imageParams}`,
  'farming': `${baseImagePath}farming.png${imageParams}`,
}

const clanIcon = `${baseImagePath}clan.png${imageParams}`;

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
  'farming': '<:EKS_farming:1329569864188432395>',
}

export { skillTypes, skillIcons, emojiIcons, clanIcon }