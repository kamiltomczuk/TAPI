export const characters = [
  {
    id: '1',
    firstName: 'Harry',
    lastName: 'Potter',
    fullName: 'Harry James Potter',
    house: 'Gryffindor',
    bloodStatus: 'Half-blood',
    wand: {
      wood: 'Holly',
      core: 'Phoenix feather',
      length: 11,
      flexibility: 'Supple'
    },
    patronus: 'Stag',
    isDeathEater: false,
    isOrderMember: true,
    role: 'STUDENT',
    birthDate: '1980-07-31',
    deathDate: null,
    ancestry: 'Half-blood',
    skills: [
      { name: 'Defense Against the Dark Arts', description: 'Proficient in defensive spells', proficiency: 'MASTER' }
    ],
    magicalCreaturesInteracted: [
      { name: 'Hippogriff', species: 'Hippogriff', description: 'A magical creature with the front half of an eagle and the hind half of a horse' }
    ],
    friends: [
      { character: { id: '2' }, relationshipType: 'Best Friend' },

    ],
    enemies: [
      { character: { id: '2' }, relationshipType: 'Rival' }
    ],
    notableEvents: [
      { name: 'Battle of Hogwarts', date: '1998-05-02', description: 'Final battle of the Second Wizarding War' }
    ],
    favoriteSpells: ['1', '2'],
    affiliations: [
      { name: 'Dumbledore\'s Army', role: 'Leader', description: 'A student organization founded by Harry Potter to oppose Dolores Umbridge' }
    ],
    quotes: [
      { text: 'It’s wingardium leviOsa, not leviosAH.', situation: 'Teaching Ron the Levitation Charm' }
    ]
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