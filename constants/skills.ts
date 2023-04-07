const skillKeys = {
  'total': 'Overall',
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
};

type skillTypes = keyof typeof skillKeys;

const skills = Object.entries(skillKeys).map(([value, name]) => ({ name, value }));

export { skillKeys, skillTypes, skills };
