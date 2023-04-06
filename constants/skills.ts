type skillTypes = 'crafting' | 'fishing' | 'cooking' | 'defence' | 'firemaking' | 'health' | 'woodcutting' | 'mining' | 'smithing' | 'thieving' | 'melee' | 'magic' |  'total';

const skills: {
  name: string;
  value: skillTypes;
}[] = [
  { name: 'Overall', value: 'total' },
  { name: 'Woodcutting', value: 'woodcutting' },
  { name: 'Firemaking', value: 'firemaking' },
  { name: 'Fishing', value: 'fishing' },
  { name: 'Cooking', value: 'cooking' },
  { name: 'Mining', value: 'mining' },
  { name: 'Smithing', value: 'smithing' },
  { name: 'Crafting', value: 'crafting' },
  { name: 'Thieving', value: 'thieving' },
  { name: 'Melee', value: 'melee' },
  { name: 'Magic', value: 'magic' },
  { name: 'Defence', value: 'defence' },
  { name: 'Health', value: 'health' },
];

export { skillTypes, skills };
