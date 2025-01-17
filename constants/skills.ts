const skillKeys = {
  'combined': 'Combined Level',
  'total': 'Total XP',
  'woodcutting': 'Woodcutting',
  'firemaking': 'Firemaking',
  'fishing': 'Fishing',
  'cooking': 'Cooking',
  'mining': 'Mining',
  'smithing': 'Smithing',
  'crafting': 'Crafting',
  'thieving': 'Thieving',
  'melee': 'Melee',
  'magic': 'Magic',
  'defence': 'Defence',
  'health': 'Health',
  'fletching': 'Fletching',
  'ranged': 'Ranged',
  'alchemy': 'Alchemy',
  'forging': 'Forging',
  'farming' : 'Farming',
};

type skillTypes = keyof typeof skillKeys;

const skills = Object.entries(skillKeys).map(([value, name]) => ({ name, value }));

export { skillKeys, skillTypes, skills };
