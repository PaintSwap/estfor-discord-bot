import type { skillTypes } from "./skills";

const baseImagePath = 'https://raw.githubusercontent.com/PaintSwap/resources/refs/heads/main/estfor_icons/';

const skillIcons: {
  [key in skillTypes]: string;
} = {
  'crafting': `${baseImagePath}crafting.png`,
  'fishing': `${baseImagePath}fishing.png`,
  'cooking': `${baseImagePath}cooking.png`,
  'defence': `${baseImagePath}defence.png`,
  'firemaking': `${baseImagePath}firemaking.png`,
  'health' : `${baseImagePath}health.png`,
  'magic' : `${baseImagePath}magic_hat.png`,
  'melee' : `${baseImagePath}melee.png`,
  'mining' : `${baseImagePath}mining.png`,
  'smithing': `${baseImagePath}smithing.png`,
  'thieving': `${baseImagePath}thieving.png`,
  'woodcutting': `${baseImagePath}woodcutting.png`,
  'combined': `${baseImagePath}all.png`,
  'total': `${baseImagePath}all.png`,
  'fletching': `${baseImagePath}fletching.png`,
  'ranged': `${baseImagePath}ranged.png`,
  'alchemy': `${baseImagePath}alchemy.png`,
  'forging': `${baseImagePath}forging.png`,
  'farming': `${baseImagePath}farming.png`,
}

const clanIcon = `${baseImagePath}clan.png`;

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