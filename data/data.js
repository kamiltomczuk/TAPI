export const characters = [
  {
    id: '1',
    firstName: 'Harry',
    lastName: 'Potter',
    fullName: 'Harry Potter',
    house: 'GRYFFINDOR',
    bloodStatus: 'HALF_BLOOD',
    wand: { wood: 'Holly', core: 'Phoenix feather', length: 11, flexibility: 'Supple' },
    patronus: 'Stag',
    isDeathEater: false,
    isOrderMember: true,
    role: 'STUDENT',
    birthDate: '1980-07-31',
    deathDate: null,
    ancestry: 'Half-blood',
    skills: [{ name: 'Defense Against the Dark Arts', description: 'Proficient', proficiency: 'MASTER' }],
    magicalCreaturesInteracted: [{ name: 'Hippogriff', species: 'Hippogriff', description: 'Buckbeak' }],
    friends: [{ character: { id: '2', firstName: 'Ron', lastName: 'Weasley', fullName: 'Ron Weasley' }, relationshipType: 'FRIEND' }],
    enemies: [{ character: { id: '3', firstName: 'Draco', lastName: 'Malfoy', fullName: 'Draco Malfoy' }, relationshipType: 'ENEMY' }],
    notableEvents: [{ name: 'Battle of Hogwarts', date: '1998-05-02', description: 'Final battle against Voldemort' }],
    favoriteSpells: ['1'], // Only spell IDs
    affiliations: [{ name: 'Dumbledore\'s Army', role: 'Leader', description: 'Student organization' }],
    quotes: [{ text: 'I solemnly swear that I am up to no good.', situation: 'Using the Marauder\'s Map' }]
  },
  {
    id: '2',
    firstName: 'Hermione',
    lastName: 'Granger',
    fullName: 'Hermione Granger',
    house: 'GRYFFINDOR',
    bloodStatus: 'MUGGLE_BORN',
    wand: { wood: 'Vine', core: 'Dragon heartstring', length: 10.75, flexibility: 'Pliable' },
    patronus: 'Otter',
    isDeathEater: false,
    isOrderMember: true,
    role: 'STUDENT',
    birthDate: '1979-09-19',
    deathDate: null,
    ancestry: 'Muggle-born',
    skills: [{ name: 'Charms', description: 'Proficient', proficiency: 'MASTER' }],
    magicalCreaturesInteracted: [{ name: 'House-elf', species: 'Elf', description: 'Dobby' }],
    friends: [{ character: { id: '1', firstName: 'Harry', lastName: 'Potter', fullName: 'Harry Potter' }, relationshipType: 'FRIEND' }],
    enemies: [{ character: { id: '3', firstName: 'Draco', lastName: 'Malfoy', fullName: 'Draco Malfoy' }, relationshipType: 'ENEMY' }],
    notableEvents: [{ name: 'Battle of Hogwarts', date: '1998-05-02', description: 'Final battle against Voldemort' }],
    favoriteSpells: ['2'], // Only spell IDs
    affiliations: [{ name: 'Dumbledore\'s Army', role: 'Member', description: 'Student organization' }],
    quotes: [{ text: 'It’s wingardium leviOsa, not leviosAH.', situation: 'Teaching Ron the Levitation Charm' }]
  }
];

export const spells = [
  {
    id: '1',
    name: 'Expelliarmus',
    type: 'CHARM',
    description: 'Disarming Charm',
    level: 'EASY',
    effect: 'Disarms opponent'
  },
  {
    id: '2',
    name: 'Alohomora',
    type: 'CHARM',
    description: 'Unlocking Charm',
    level: 'EASY',
    effect: 'Unlocks doors'
  }
];

export default {
  characters,
  spells,
}; 