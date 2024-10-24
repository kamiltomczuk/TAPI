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
      { character: { id: '3' }, relationshipType: 'Best Friend' }
    ],
    enemies: [
      // { character: { id: '2' }, relationshipType: 'Rival' }
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
    house: 'Gryffindor',
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
    friends: [
      { character: { id: '1' }, relationshipType: 'Best Friend' },
      { character: { id: '3' }, relationshipType: 'Best Friend' }
    ],
    enemies: [
      // { character: { id: '3', firstName: 'Draco', lastName: 'Malfoy', fullName: 'Draco Malfoy' }, relationshipType: 'ENEMY' }
    ],
    notableEvents: [{ name: 'Battle of Hogwarts', date: '1998-05-02', description: 'Final battle against Voldemort' }],
    favoriteSpells: ['2'], // Only spell IDs
    affiliations: [{ name: 'Dumbledore\'s Army', role: 'Member', description: 'Student organization' }],
    quotes: [{ text: 'It’s wingardium leviOsa, not leviosAH.', situation: 'Teaching Ron the Levitation Charm' }]
  },
  {
    id: '3',
    firstName: 'Ron',
    lastName: 'Weasley',
    fullName: 'Ronald Bilius Weasley',
    house: 'Gryffindor',
    bloodStatus: 'PURE_BLOOD',
    wand: { wood: 'Willow', core: 'Unicorn tail hair', length: 14, flexibility: 'Swishy' },
    patronus: 'Jack Russell Terrier',
    isDeathEater: false,
    isOrderMember: true,
    role: 'STUDENT',
    birthDate: '1980-03-01',
    deathDate: null,
    ancestry: 'Pure-blood',
    skills: [{ name: 'Chess', description: 'Proficient', proficiency: 'MASTER' }],
    magicalCreaturesInteracted: [{ name: 'House-elf', species: 'Elf', description: 'Dobby' }],
    friends: [
      { character: { id: '2' }, relationshipType: 'Best Friend' },
      { character: { id: '1' }, relationshipType: 'Best Friend' }
    ],
    enemies: [
      // { character: { id: '2' }, relationshipType: 'Rival' }
    ],
    notableEvents: [{ name: 'Battle of Hogwarts', date: '1998-05-02', description: 'Final battle of the Second Wizarding War' }],
    favoriteSpells: ['1'], // Only spell IDs
    affiliations: [{ name: 'Dumbledore\'s Army', role: 'Member', description: 'Student organization' }],
    quotes: [{ text: 'Believe me, Professor, I\'ve been asking myself that question for six years.', situation: 'McGonnagal\'s office' }]
  },
  {
    id: '4',
    firstName: 'Draco',
    lastName: 'Malfoy',
    fullName: 'Draco Lucius Malfoy',
    house: 'Slytherin',
    bloodStatus: 'PURE_BLOOD',
    wand: { wood: 'Hawthorn', core: 'Unicorn hair', length: 10, flexibility: 'Unyielding' },
    patronus: null,
    isDeathEater: true,
    isOrderMember: false,
    role: 'STUDENT',
    birthDate: '1980-06-05',
    deathDate: null,
    ancestry: 'Pure-blood',
    skills: [{ name: 'Potions', description: 'Proficient', proficiency: 'MASTER' }],
    magicalCreaturesInteracted: [{ name: 'House-elf', species: 'Elf', description: 'Dobby' }],
    friends: [
      // { character: { id: '2' }, relationshipType: 'Friend' }
    ],
    enemies: [
      { character: { id: '1' }, relationshipType: 'Rival' }
    ],
    notableEvents: [{ name: 'Battle of Hogwarts', date: '1998-05-02', description: 'Final battle of the Second Wizarding War' }],
    favoriteSpells: ['1'], // Only spell IDs
    affiliations: [{ name: 'Death Eaters', role: 'Member', description: 'Supporters of Lord Voldemort' }],
    quotes: [{ text: 'My father will hear about this!', situation: 'Various' }]
  },
  {
    id: '5',
    firstName: 'Albus',
    lastName: 'Dumbledore',
    fullName: 'Albus Percival Wulfric Brian Dumbledore',
    house: 'Gryffindor',
    bloodStatus: 'HALF_BLOOD',
    wand: { wood: 'Elder', core: 'Thestral tail hair', length: 15, flexibility: 'Unyielding' },
    patronus: 'Phoenix',
    isDeathEater: false,
    isOrderMember: true,
    role: 'TEACHER',
    birthDate: '1881-07-01',
    deathDate: '1997-06-30',
    ancestry: 'Half-blood',
    skills: [{ name: 'Transfiguration', description: 'Master', proficiency: 'MASTER' }],
    magicalCreaturesInteracted: [{ name: 'Phoenix', species: 'Bird', description: 'Fawkes' }],
    friends: [
      // { character: { id: '6' }, relationshipType: 'Friend' }
    ],
    enemies: [
      // { character: { id: '7' }, relationshipType: 'Enemy' }
    ],
    notableEvents: [{ name: 'Battle of Hogwarts', date: '1998-05-02', description: 'Final battle of the Second Wizarding War' }],
    favoriteSpells: ['1'], // Only spell IDs
    affiliations: [{ name: 'Order of the Phoenix', role: 'Leader', description: 'Secret society founded by Albus Dumbledore' }],
    quotes: [{ text: 'It does not do to dwell on dreams and forget to live.', situation: 'The Mirror of Erised' }]
  },
  {
    id: '6',
    firstName: 'Severus',
    lastName: 'Snape',
    fullName: 'Severus Snape',
    house: 'Slytherin',
    bloodStatus: 'HALF_BLOOD',
    wand: { wood: 'Unknown', core: 'Unknown', length: 13.5, flexibility: 'Unknown' },
    patronus: 'Doe',
    isDeathEater: true,
    isOrderMember: true,
    role: 'TEACHER',
    birthDate: '1960-01-09',
    deathDate: '1998-05-02',
    ancestry: 'Half-blood',
    skills: [{ name: 'Potions', description: 'Master', proficiency: 'MASTER' }],
    magicalCreaturesInteracted: [{ name: 'Phoenix', species: 'Bird', description: 'Fawkes' }],
    friends: [
      // { character: { id: '5' }, relationshipType: 'Friend' }
    ],
    enemies: [
      // { character: { id: '7' }, relationshipType: 'Enemy' }
    ],
    notableEvents: [{ name: 'Battle of Hogwarts', date: '1998-05-02', description: 'Final battle of the Second Wizarding War' }],
    favoriteSpells: ['1'], // Only spell IDs
    affiliations: [{ name: 'Death Eaters', role: 'Member', description: 'Supporters of Lord Voldemort' }],
    quotes: [{ text: 'Always.', situation: 'The Prince\'s Tale' }]
  },
  {
    id: '7',
    firstName: 'Lord Voldemort',
    lastName: null,
    fullName: 'Tom Marvolo Riddle',
    house: 'Slytherin',
    bloodStatus: 'HALF_BLOOD',
    wand: { wood: 'Yew', core: 'Phoenix feather', length: 13.5, flexibility: 'Unyielding' },
    patronus: null,
    isDeathEater: true,
    isOrderMember: false,
    role: 'OTHER',
    birthDate: '1926-12-31',
    deathDate: '1998-05-02',
    ancestry: 'Half-blood',
    skills: [{ name: 'Dark Arts', description: 'Master', proficiency: 'MASTER' }],
    magicalCreaturesInteracted: [{ name: 'Basilisk', species: 'Snake', description: 'Salazar Slytherin\'s Basilisk' }],
    friends: [
      // { character: { id: '6' }, relationshipType: 'Friend' }
    ],
    enemies: [
      // { character: { id: '5' }, relationshipType: 'Enemy' }
    ],
    notableEvents: [{ name: 'Battle of Hogwarts', date: '1998-05-02', description: 'Final battle of the Second Wizarding War' }],
    favoriteSpells: ['1'], // Only spell IDs
    affiliations: [{ name: 'Death Eaters', role: 'Leader', description: 'Dark wizard organization' }],
    quotes: [{ text: 'There is no good and evil, there is only power and those too weak to seek it.', situation: 'The Philosopher\'s Stone' }]
  },
  {
    id: '8',
    firstName: 'Bellatrix',
    lastName: 'Lestrange',
    fullName: 'Bellatrix Lestrange',
    house: 'Slytherin',
    bloodStatus: 'PURE_BLOOD',
    wand: { wood: 'Walnut', core: 'Dragon heartstring', length: 12.75, flexibility: 'Unyielding' },
    patronus: null,
    isDeathEater: true,
    isOrderMember: false,
    role: 'OTHER',
    birthDate: '1951-09-01',
    deathDate: '1998-05-02',
    ancestry: 'Pure-blood',
    skills: [{ name: 'Dark Arts', description: 'Master', proficiency: 'MASTER' }],
    magicalCreaturesInteracted: [{ name: 'Dementor', species: 'Spirit', description: 'Azkaban guard' }],
    friends: [
      // { character: { id: '6' }, relationshipType: 'Friend' }
    ],
    enemies: [
      // { character: { id: '5' }, relationshipType: 'Enemy' }
    ],
    notableEvents: [{ name: 'Battle of Hogwarts', date: '1998-05-02', description: 'Final battle of the Second Wizarding War' }],
    favoriteSpells: ['1'], // Only spell IDs
    affiliations: [{ name: 'Death Eaters', role: 'Member', description: 'Supporters of Lord Voldemort' }],
    quotes: [{ text: 'I killed Sirius Black!', situation: 'Battle of the Department of Mysteries' }]
  },
  {
    id: '9',
    firstName: 'Sirius',
    lastName: 'Black',
    fullName: 'Sirius Black',
    house: 'Gryffindor',
    bloodStatus: 'PURE_BLOOD',
    wand: { wood: 'Unknown', core: 'Unknown', length: 14, flexibility: 'Unknown' },
    patronus: 'Unknown',
    isDeathEater: false,
    isOrderMember: true,
    role: 'OTHER',
    birthDate: '1959-11-03',
    deathDate: '1996-06-18',
    ancestry: 'Pure-blood',
    skills: [{ name: 'Animagus', description: 'Can transform into a black dog', proficiency: 'MASTER' }],
    magicalCreaturesInteracted: [{ name: 'Hippogriff', species: 'Hippogriff', description: 'Buckbeak' }],
    friends: [
      // { character: { id: '6' }, relationshipType: 'Friend' }
    ],
    enemies: [
      // { character: { id: '5' }, relationshipType: 'Enemy' }
    ],
    notableEvents: [{ name: 'Battle of the Department of Mysteries', date: '1996-06-18', description: 'Battle in the Department of Mysteries' }],
    favoriteSpells: ['1'], // Only spell IDs
    affiliations: [{ name: 'Order of the Phoenix', role: 'Member', description: 'Secret society founded by Albus Dumbledore' }],
    quotes: [{ text: 'I did my waiting! Twelve years of it! In Azkaban!', situation: 'Grimmauld Place' }]
  },
  {
    id: '10',
    firstName: 'Rubeus',
    lastName: 'Hagrid',
    fullName: 'Rubeus Hagrid',
    house: 'Gryffindor',
    bloodStatus: 'UNKNOWN',
    wand: { wood: 'Oak', core: 'Unknown', length: 16, flexibility: 'Unknown' },
    patronus: null,
    isDeathEater: false,
    isOrderMember: false,
    role: 'TEACHER',
    birthDate: '1928-12-06',
    deathDate: null,
    ancestry: 'Unknown',
    skills: [{ name: 'Care of Magical Creatures', description: 'Proficient', proficiency: 'MASTER' }],
    magicalCreaturesInteracted: [{ name: 'Hippogriff', species: 'Hippogriff', description: 'Buckbeak' }],
    friends: [
      // { character: { id: '6' }, relationshipType: 'Friend' }
    ],
    enemies: [
      // { character: { id: '5' }, relationshipType: 'Enemy' }
    ],
    notableEvents: [{ name: 'Battle of Hogwarts', date: '1998-05-02', description: 'Final battle of the Second Wizarding War' }],
    favoriteSpells: ['1'], // Only spell IDs
    affiliations: [{ name: 'Order of the Phoenix', role: 'Member', description: 'Secret society founded by Albus Dumbledore' }],
    quotes: [{ text: 'You\'re a wizard, Harry.', situation: 'Hut-on-the-Rock' }]
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