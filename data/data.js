export const characters = [
  {
    id: "1",
    firstName: "Harry",
    lastName: "Potter",
    fullName: "Harry James Potter",
    house: "Gryffindor",
    bloodStatus: "Half-blood",
    wand: {
      wood: "Holly",
      core: "Phoenix feather",
      length: 11,
      flexibility: "Supple",
    },
    patronus: "Stag",
    isDeathEater: false,
    isOrderMember: true,
    role: "STUDENT",
    birthDate: "1980-07-31",
    deathDate: null,
    ancestry: "Half-blood",
    skills: [
      {
        name: "Defense Against the Dark Arts",
        description: "Proficient in defensive spells",
        proficiency: "MASTER",
      },
    ],
    magicalCreatures: [
      {
        creature: { id: "1", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "Hedwig was Harry's loyal pet owl",
      },
    ],
    friends: [
      { character: { id: "2" }, relationshipType: "Best Friend" },
      { character: { id: "3" }, relationshipType: "Best Friend" },
    ],
    enemies: [
      { character: { id: "4" }, relationshipType: "Rival" },
      { character: { id: "7" }, relationshipType: "Rival" },
      { character: { id: "8" }, relationshipType: "Rival" },
    ],
    notableEvents: [
      {
        name: "Battle of Hogwarts",
        date: "1998-05-02",
        description: "Final battle of the Second Wizarding War",
      },
    ],
    favoriteSpells: ["1", "2"],
    affiliations: [
      {
        name: "Dumbledore's Army",
        role: "Leader",
        description:
          "A student organization founded by Harry Potter to oppose Dolores Umbridge",
      },
    ],
    quotes: [
      {
        text: "I solemn swear that I am up to no good.",
        situation: "Opening the Marauder's Map",
      },
    ],
  },
  {
    id: "2",
    firstName: "Hermione",
    lastName: "Granger",
    fullName: "Hermione Granger",
    house: "Gryffindor",
    bloodStatus: "MUGGLE_BORN",
    wand: {
      wood: "Vine",
      core: "Dragon heartstring",
      length: 10.75,
      flexibility: "Pliable",
    },
    patronus: "Otter",
    isDeathEater: false,
    isOrderMember: true,
    role: "STUDENT",
    birthDate: "1979-09-19",
    deathDate: null,
    ancestry: "Muggle-born",
    skills: [
      { name: "Charms", description: "Proficient", proficiency: "MASTER" },
    ],
    magicalCreatures: [
      {
        creature: { id: "2", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "A free elf",
      },
    ],
    friends: [
      { character: { id: "1" }, relationshipType: "Best Friend" },
      { character: { id: "3" }, relationshipType: "Best Friend" },
    ],
    enemies: [
      { character: { id: "4" }, relationshipType: "Rival" },
      { character: { id: "7" }, relationshipType: "Rival" },
      { character: { id: "8" }, relationshipType: "Rival" },
    ],
    notableEvents: [
      {
        name: "Battle of Hogwarts",
        date: "1998-05-02",
        description: "Final battle against Voldemort",
      },
    ],
    favoriteSpells: ["2"], // Only spell IDs
    affiliations: [
      {
        name: "Dumbledore's Army",
        role: "Member",
        description: "Student organization",
      },
    ],
    quotes: [
      {
        text: "It’s wingardium leviOsa, not leviosAH.",
        situation: "Teaching Ron the Levitation Charm",
      },
    ],
  },
  {
    id: "3",
    firstName: "Ron",
    lastName: "Weasley",
    fullName: "Ronald Bilius Weasley",
    house: "Gryffindor",
    bloodStatus: "PURE_BLOOD",
    wand: {
      wood: "Willow",
      core: "Unicorn tail hair",
      length: 14,
      flexibility: "Swishy",
    },
    patronus: "Jack Russell Terrier",
    isDeathEater: false,
    isOrderMember: true,
    role: "STUDENT",
    birthDate: "1980-03-01",
    deathDate: null,
    ancestry: "Pure-blood",
    skills: [
      { name: "Chess", description: "Proficient", proficiency: "MASTER" },
    ],
    magicalCreatures: [
      {
        creature: { id: "2", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "A free elf",
      },
    ],
    friends: [
      { character: { id: "1" }, relationshipType: "Best Friend" },
      { character: { id: "2" }, relationshipType: "Best Friend" },
    ],
    enemies: [
      { character: { id: "4" }, relationshipType: "Rival" },
      { character: { id: "7" }, relationshipType: "Rival" },
      { character: { id: "8" }, relationshipType: "Rival" },
    ],
    notableEvents: [
      {
        name: "Battle of Hogwarts",
        date: "1998-05-02",
        description: "Final battle of the Second Wizarding War",
      },
    ],
    favoriteSpells: ["1", "2", "3"],
    affiliations: [
      {
        name: "Dumbledore's Army",
        role: "Member",
        description: "Student organization",
      },
    ],
    quotes: [
      {
        text: "Believe me, Professor, I've been asking myself that question for six years.",
        situation: "McGonnagal's office",
      },
    ],
  },
  {
    id: "4",
    firstName: "Draco",
    lastName: "Malfoy",
    fullName: "Draco Lucius Malfoy",
    house: "Slytherin",
    bloodStatus: "PURE_BLOOD",
    wand: {
      wood: "Hawthorn",
      core: "Unicorn hair",
      length: 10,
      flexibility: "Unyielding",
    },
    patronus: null,
    isDeathEater: true,
    isOrderMember: false,
    role: "STUDENT",
    birthDate: "1980-06-05",
    deathDate: null,
    ancestry: "Pure-blood",
    skills: [
      { name: "Potions", description: "Proficient", proficiency: "MASTER" },
    ],
    magicalCreatures: [
      {
        creature: { id: "2", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "His family's house elf",
      },
    ],
    friends: [
      // { character: { id: '2' }, relationshipType: 'Friend' }
    ],
    enemies: [{ character: { id: "1" }, relationshipType: "Rival" }],
    notableEvents: [
      {
        name: "Battle of Hogwarts",
        date: "1998-05-02",
        description: "Final battle of the Second Wizarding War",
      },
    ],
    favoriteSpells: ["1"], // Only spell IDs
    affiliations: [
      {
        name: "Death Eaters",
        role: "Member",
        description: "Supporters of Lord Voldemort",
      },
    ],
    quotes: [{ text: "My father will hear about this!", situation: "Various" }],
  },
  {
    id: "5",
    firstName: "Albus",
    lastName: "Dumbledore",
    fullName: "Albus Percival Wulfric Brian Dumbledore",
    house: "Gryffindor",
    bloodStatus: "HALF_BLOOD",
    wand: {
      wood: "Elder",
      core: "Thestral tail hair",
      length: 15,
      flexibility: "Unyielding",
    },
    patronus: "Phoenix",
    isDeathEater: false,
    isOrderMember: true,
    role: "TEACHER",
    birthDate: "1881-07-01",
    deathDate: "1997-06-30",
    ancestry: "Half-blood",
    skills: [
      { name: "Transfiguration", description: "Master", proficiency: "MASTER" },
    ],
    magicalCreatures: [
      {
        creature: { id: "11", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "Dumbledore's family's animal",
      },
    ],
    friends: [
      { character: { id: "6" }, relationshipType: "Friend" },
      { character: { id: "1" }, relationshipType: "Friend" },
      { character: { id: "2" }, relationshipType: "Friend" },
      { character: { id: "3" }, relationshipType: "Friend" },
    ],
    enemies: [
      { character: { id: "7" }, relationshipType: "Enemy" },
      { character: { id: "8" }, relationshipType: "Enemy" },
    ],
    notableEvents: [
      {
        name: "Battle of Hogwarts",
        date: "1998-05-02",
        description: "Final battle of the Second Wizarding War",
      },
    ],
    favoriteSpells: ["1"], // Only spell IDs
    affiliations: [
      {
        name: "Order of the Phoenix",
        role: "Leader",
        description: "Secret society founded by Albus Dumbledore",
      },
    ],
    quotes: [
      {
        text: "It does not do to dwell on dreams and forget to live.",
        situation: "The Mirror of Erised",
      },
    ],
  },
  {
    id: "6",
    firstName: "Severus",
    lastName: "Snape",
    fullName: "Severus Snape",
    house: "Slytherin",
    bloodStatus: "HALF_BLOOD",
    wand: {
      wood: "Unknown",
      core: "Unknown",
      length: 13.5,
      flexibility: "Unknown",
    },
    patronus: "Doe",
    isDeathEater: true,
    isOrderMember: true,
    role: "TEACHER",
    birthDate: "1960-01-09",
    deathDate: "1998-05-02",
    ancestry: "Half-blood",
    skills: [{ name: "Potions", description: "Master", proficiency: "MASTER" }],
    magicalCreatures: [
      {
        creature: { id: "11", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "Dumbledore's family's animal",
      },
    ],
    friends: [
      { character: { id: "5" }, relationshipType: "Friend" },
      { character: { id: "7" }, relationshipType: "Friend" },
    ],
    enemies: [
      { character: { id: "5" }, relationshipType: "Enemy" },
      { character: { id: "7" }, relationshipType: "Enemy" },
    ],
    notableEvents: [
      {
        name: "Battle of Hogwarts",
        date: "1998-05-02",
        description: "Final battle of the Second Wizarding War",
      },
    ],
    favoriteSpells: ["1"], // Only spell IDs
    affiliations: [
      {
        name: "Death Eaters",
        role: "Member",
        description: "Supporters of Lord Voldemort",
      },
    ],
    quotes: [{ text: "Always.", situation: "The Prince's Tale" }],
  },
  {
    id: "7",
    firstName: "Lord Voldemort",
    lastName: "Riddle",
    fullName: "Tom Marvolo Riddle",
    house: "Slytherin",
    bloodStatus: "HALF_BLOOD",
    wand: {
      wood: "Yew",
      core: "Phoenix feather",
      length: 13.5,
      flexibility: "Unyielding",
    },
    patronus: null,
    isDeathEater: true,
    isOrderMember: false,
    role: "OTHER",
    birthDate: "1926-12-31",
    deathDate: "1998-05-02",
    ancestry: "Half-blood",
    skills: [
      { name: "Dark Arts", description: "Master", proficiency: "MASTER" },
    ],
    magicalCreatures: [
      {
        creature: { id: "9", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "A giant serpent locked in a Chamber of Secrets",
      },
    ],
    friends: [{ character: { id: "8" }, relationshipType: "Friend" }],
    enemies: [
      { character: { id: "1" }, relationshipType: "Enemy" },
      { character: { id: "2" }, relationshipType: "Enemy" },
      { character: { id: "3" }, relationshipType: "Enemy" },
      { character: { id: "5" }, relationshipType: "Enemy" },
    ],
    notableEvents: [
      {
        name: "Battle of Hogwarts",
        date: "1998-05-02",
        description: "Final battle of the Second Wizarding War",
      },
    ],
    favoriteSpells: ["1"], // Only spell IDs
    affiliations: [
      {
        name: "Death Eaters",
        role: "Leader",
        description: "Dark wizard organization",
      },
    ],
    quotes: [
      {
        text: "There is no good and evil, there is only power and those too weak to seek it.",
        situation: "The Philosopher's Stone",
      },
    ],
  },
  {
    id: "8",
    firstName: "Bellatrix",
    lastName: "Lestrange",
    fullName: "Bellatrix Lestrange",
    house: "Slytherin",
    bloodStatus: "PURE_BLOOD",
    wand: {
      wood: "Walnut",
      core: "Dragon heartstring",
      length: 12.75,
      flexibility: "Unyielding",
    },
    patronus: null,
    isDeathEater: true,
    isOrderMember: false,
    role: "OTHER",
    birthDate: "1951-09-01",
    deathDate: "1998-05-02",
    ancestry: "Pure-blood",
    skills: [
      { name: "Dark Arts", description: "Master", proficiency: "MASTER" },
    ],
    magicalCreatures: [
      {
        creature: { id: "12", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "Lord Voldemort's snake",
      },
      {
        creature: { id: "8", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "A dark creature that feeds on human happiness",
      },
    ],
    friends: [{ character: { id: "7" }, relationshipType: "Friend" }],
    enemies: [
      { character: { id: "1" }, relationshipType: "Enemy" },
      { character: { id: "2" }, relationshipType: "Enemy" },
      { character: { id: "3" }, relationshipType: "Enemy" },
      { character: { id: "5" }, relationshipType: "Enemy" },
      { character: { id: "9" }, relationshipType: "Enemy" },
    ],
    notableEvents: [
      {
        name: "Battle of Hogwarts",
        date: "1998-05-02",
        description: "Final battle of the Second Wizarding War",
      },
    ],
    favoriteSpells: ["1"], // Only spell IDs
    affiliations: [
      {
        name: "Death Eaters",
        role: "Member",
        description: "Supporters of Lord Voldemort",
      },
    ],
    quotes: [
      {
        text: "I killed Sirius Black!",
        situation: "Battle of the Department of Mysteries",
      },
    ],
  },
  {
    id: "9",
    firstName: "Sirius",
    lastName: "Black",
    fullName: "Sirius Black",
    house: "Gryffindor",
    bloodStatus: "PURE_BLOOD",
    wand: {
      wood: "Unknown",
      core: "Unknown",
      length: 14,
      flexibility: "Unknown",
    },
    patronus: "Unknown",
    isDeathEater: false,
    isOrderMember: true,
    role: "OTHER",
    birthDate: "1959-11-03",
    deathDate: "1996-06-18",
    ancestry: "Pure-blood",
    skills: [
      {
        name: "Animagus",
        description: "Can transform into a black dog",
        proficiency: "MASTER",
      },
    ],
    magicalCreatures: [
      {
        creature: { id: "11", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "Dumbledore's family's animal",
      },
    ],
    friends: [
      { character: { id: "1" }, relationshipType: "Friend" },
      { character: { id: "2" }, relationshipType: "Friend" },
      { character: { id: "3" }, relationshipType: "Friend" },
    ],
    enemies: [
      { character: { id: "7" }, relationshipType: "Enemy" },
      { character: { id: "8" }, relationshipType: "Cousin" },
    ],
    notableEvents: [
      {
        name: "Battle of the Department of Mysteries",
        date: "1996-06-18",
        description: "Battle in the Department of Mysteries",
      },
    ],
    favoriteSpells: ["1"], // Only spell IDs
    affiliations: [
      {
        name: "Order of the Phoenix",
        role: "Member",
        description: "Secret society founded by Albus Dumbledore",
      },
    ],
    quotes: [
      {
        text: "I did my waiting! Twelve years of it! In Azkaban!",
        situation: "Grimmauld Place",
      },
    ],
  },
  {
    id: "10",
    firstName: "Rubeus",
    lastName: "Hagrid",
    fullName: "Rubeus Hagrid",
    house: "Gryffindor",
    bloodStatus: "UNKNOWN",
    wand: { wood: "Oak", core: "Unknown", length: 16, flexibility: "Unknown" },
    patronus: null,
    isDeathEater: false,
    isOrderMember: false,
    role: "TEACHER",
    birthDate: "1928-12-06",
    deathDate: null,
    ancestry: "Unknown",
    skills: [
      {
        name: "Care of Magical Creatures",
        description: "Proficient",
        proficiency: "MASTER",
      },
    ],
    magicalCreatures: [
      {
        creature: { id: "3", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "Hagrid's loyal pet dog",
      },
      {
        creature: { id: "4", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "Buckbeat, Hagrid's loyal pet",
      },
      {
        creature: { id: "5", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "A dragon hatched by Hagrid",
      },
      {
        creature: { id: "6", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "A large, vicious dog with three heads",
      },
      {
        creature: { id: "7", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "A giant spider that lives in the Forbidden Forest",
      },
    ],
    friends: [
      { character: { id: "1" }, relationshipType: "Friend" },
      { character: { id: "2" }, relationshipType: "Friend" },
      { character: { id: "3" }, relationshipType: "Friend" },
      { character: { id: "5" }, relationshipType: "Friend" },
    ],
    enemies: [
      { character: { id: "7" }, relationshipType: "Enemy" },
      { character: { id: "8" }, relationshipType: "Enemy" },
    ],
    notableEvents: [
      {
        name: "Battle of Hogwarts",
        date: "1998-05-02",
        description: "Final battle of the Second Wizarding War",
      },
    ],
    favoriteSpells: ["1"], // Only spell IDs
    affiliations: [
      {
        name: "Order of the Phoenix",
        role: "Member",
        description: "Secret society founded by Albus Dumbledore",
      },
    ],
    quotes: [{ text: "You're a wizard, Harry.", situation: "Hut-on-the-Rock" }],
  },
  {
    id: "11",
    firstName: "Minerva",
    lastName: "McGonagall",
    fullName: "Minerva McGonagall",
    house: "Gryffindor",
    bloodStatus: "HALF_BLOOD",
    wand: {
      wood: "Fir",
      core: "Dragon heartstring",
      length: 9.5,
      flexibility: "Hard",
    },
    patronus: "Cat",
    isDeathEater: false,
    isOrderMember: true,
    role: "TEACHER",
    birthDate: "1935-10-04",
    deathDate: null,
    ancestry: "Half-blood",
    skills: [
      { name: "Transfiguration", description: "Master", proficiency: "MASTER" },
    ],
    magicalCreatures: [
      {
        creature: { id: "6", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "A large, vicious dog with three heads",
      },
    ],
    friends: [
      { character: { id: "5" }, relationshipType: "Friend" },
      { character: { id: "6" }, relationshipType: "Friend" },
      { character: { id: "10" }, relationshipType: "Friend" },
    ],
    enemies: [
      { character: { id: "7" }, relationshipType: "Enemy" },
      { character: { id: "8" }, relationshipType: "Enemy" },
    ],
    notableEvents: [
      {
        name: "Battle of Hogwarts",
        date: "1998-05-02",
        description: "Final battle of the Second Wizarding War",
      },
    ],
    favoriteSpells: ["1"], // Only spell IDs
    affiliations: [
      {
        name: "Order of the Phoenix",
        role: "Member",
        description: "Secret society founded by Albus Dumbledore",
      },
    ],
    quotes: [
      {
        text: "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
        situation: "The Philosopher's Stone",
      },
    ],
  },
  {
    id: "12",
    firstName: "Gregory",
    lastName: "Goyle",
    fullName: "Gregory Goyle",
    house: "Slytherin",
    bloodStatus: "PURE_BLOOD",
    wand: {
      wood: "Unknown",
      core: "Unknown",
      length: 12,
      flexibility: "Unknown",
    },
    patronus: null,
    isDeathEater: true,
    isOrderMember: false,
    role: "STUDENT",
    birthDate: "1980-02-01",
    deathDate: null,
    ancestry: "Pure-blood",
    skills: [
      { name: "Strength", description: "Strong", proficiency: "MASTER" },
    ],
    magicalCreatures: [
      {
        creature: { id: "6", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "A large, vicious dog with three heads",
      },
    ],
    friends: [
      { character: { id: "4" }, relationshipType: "Friend" },
      { character: { id: "8" }, relationshipType: "Friend" },
      { character: { id: "13" }, relationshipType: "Friend" },
    ],
    enemies: [
      { character: { id: "1" }, relationshipType: "Enemy" },
      { character: { id: "2" }, relationshipType: "Enemy" },
      { character: { id: "3" }, relationshipType: "Enemy" },
      { character: { id: "5" }, relationshipType: "Enemy" },
      { character: { id: "9" }, relationshipType: "Enemy" },
    ],
    notableEvents: [
      {
        name: "Battle of Hogwarts",
        date: "1998-05-02",
        description: "Final battle of the Second Wizarding War",
      },
    ],
    favoriteSpells: ["1"], // Only spell IDs
    affiliations: [
      {
        name: "Death Eaters",
        role: "Member",
        description: "Supporters of Lord Voldemort",
      },
    ],
    quotes: [
      {
        text: "I'm not going to die, I'm going to kill Harry Potter, even if it's the last thing I do.",
      },
    ],
  },
  {
    id: "13",
    firstName: "Vincent",
    lastName: "Crabbe",
    fullName: "Vincent Crabble",
    house: "Slytherin",
    bloodStatus: "PURE_BLOOD",
    wand: {
      wood: "Unknown",
      core: "Unknown",
      length: 12,
      flexibility: "Unknown",
    },
    patronus: null,
    isDeathEater: true,
    isOrderMember: false,
    role: "STUDENT",
    birthDate: "1980-02-01",
    deathDate: "1998-05-02",
    ancestry: "Pure-blood",
    skills: [
      { name: "Strength", description: "Strong", proficiency: "MASTER" },
    ],
    magicalCreatures: [
      {
        creature: { id: "6", type: "CREATURE" },
        relationshipType: "COMPANION",
        details: "A large, vicious dog with three heads",
      },
    ],
    friends: [
      { character: { id: "4" }, relationshipType: "Friend" },
      { character: { id: "8" }, relationshipType: "Friend" },
      { character: { id: "12" }, relationshipType: "Friend" },
    ],
    enemies: [
      { character: { id: "1" }, relationshipType: "Enemy" },
      { character: { id: "2" }, relationshipType: "Enemy" },
      { character: { id: "3" }, relationshipType: "Enemy" },
      { character: { id: "5" }, relationshipType: "Enemy" },
      { character: { id: "9" }, relationshipType: "Enemy" },
    ],
    notableEvents: [
      {
        name: "Battle of Hogwarts",
        date: "1998-05-02",
        description: "Final battle of the Second Wizarding War",
      },
    ],
    favoriteSpells: ["1"], // Only spell IDs
    affiliations: [
      {
        name: "Death Eaters",
        role: "Member",
        description: "Supporters of Lord Voldemort",
      },
    ],
    quotes: [
      {
        text: "I'm not going to die, I'm going to kill Harry Potter, even if it's the last thing I do.",
      },
    ],
  },
];

export const creatures = [
  {
    id: "1",
    name: "Hedwig",
    species: "Snowy Owl",
    description: "Harry Potter's loyal pet owl",
    dangerLevel: "LOW",
    habitat: "Domestic/Wild",
    abilities: ["Message delivery", "Navigation", "Loyalty"],
    knownFor: "Being Harry Potter's faithful companion",
    isProtected: true,
    canTalk: false,
    alignment: "GOOD",
  },
  {
    id: "2",
    name: "Dobby",
    species: "House-elf",
    description: "A free elf who served the Malfoy family",
    dangerLevel: "HARMLESS",
    habitat: "Domestic",
    abilities: ["Apparition", "Cleaning", "Cooking"],
    knownFor: "Serving the Malfoy family",
    isProtected: false,
    canTalk: true,
    alignment: "GOOD",
  },
  {
    id: "3",
    name: "Fang",
    species: "Boarhound",
    description: "Rubeus Hagrid's loyal pet dog",
    dangerLevel: "LOW",
    habitat: "Domestic",
    abilities: ["Tracking", "Loyalty", "Strength"],
    knownFor: "Accompanying Hagrid on adventures",
    isProtected: true,
    canTalk: false,
    alignment: "GOOD",
  },
  {
    id: "4",
    name: "Buckbeak",
    species: "Hippogriff",
    description:
      "A magical creature with the front half of an eagle and the hind half of a horse",
    dangerLevel: "MODERATE",
    habitat: "Wild",
    abilities: ["Flight", "Pride", "Loyalty"],
    knownFor: "Helping Harry Potter escape from the Ministry of Magic",
    isProtected: true,
    canTalk: false,
    alignment: "GOOD",
  },
  {
    id: "5",
    name: "Norbert",
    species: "Norwegian Ridgeback",
    description: "A dragon hatched by Hagrid",
    dangerLevel: "HIGH",
    habitat: "Domestic",
    abilities: ["Fire-breathing", "Flight", "Strength"],
    knownFor: "Being raised by Hagrid",
    isProtected: true,
    canTalk: false,
    alignment: "GOOD",
  },
  {
    id: "6",
    name: "Fluffy",
    species: "Three-headed Dog",
    description: "A large, vicious dog with three heads",
    dangerLevel: "HIGH",
    habitat: "Domestic",
    abilities: ["Guarding", "Strength", "Loyalty"],
    knownFor: "Guarding the Philosopher's Stone",
    isProtected: true,
    canTalk: false,
    alignment: "GOOD",
  },
  {
    id: "7",
    name: "Aragog",
    species: "Acromantula",
    description: "A giant spider that lives in the Forbidden Forest",
    dangerLevel: "EXTREME",
    habitat: "Wild",
    abilities: ["Web-spinning", "Venomous bite", "Communication"],
    knownFor: "Being Hagrid's pet",
    isProtected: true,
    canTalk: true,
    alignment: "GOOD",
  },
  {
    id: "8",
    name: "Dementor",
    species: "Spirit",
    description: "A dark creature that feeds on human happiness",
    dangerLevel: "EXTREME",
    habitat: "Azkaban",
    abilities: ["Soul-sucking", "Flight", "Fear-inducing"],
    knownFor: "Guarding Azkaban prison",
    isProtected: false,
    canTalk: false,
    alignment: "EVIL",
  },
  {
    id: "9",
    name: "Basilisk",
    species: "Snake",
    description: "A giant serpent that can kill with a single glance",
    dangerLevel: "EXTREME",
    habitat: "Chamber of Secrets",
    abilities: ["Petrification", "Venomous bite", "Immunity to spells"],
    knownFor: "Being controlled by Salazar Slytherin",
    isProtected: false,
    canTalk: false,
    alignment: "EVIL",
  },
  {
    id: "10",
    name: "Kreacher",
    species: "House-elf",
    description: "An elf who served the Black family",
    dangerLevel: "LOW",
    habitat: "Order of Pheonix",
    abilities: ["Apparition", "Cleaning", "Cooking"],
    knownFor: "Serving the Black family",
    isProtected: false,
    canTalk: true,
    alignment: "GOOD",
  },
  {
    id: "11",
    name: "Fawkes",
    species: "Pheonix",
    description: "Dumbledore's bird",
    dangerLevel: "MODERATE",
    habitat: "Chamber of Secrets",
    abilities: ["Flying", "Healing Tears", "Ability to reborn"],
    knownFor: "Blinding Basilisk",
    isProtected: false,
    canTalk: false,
    alignment: "GOOD",
  },
  {
    id: "12",
    name: "Nagini",
    species: "Snake",
    description: "Voldemort's snake",
    dangerLevel: "EXTREME",
    habitat: "Wild",
    abilities: ["Venomous bite", "Mind control", "Immunity to spells"],
    knownFor: "Being Voldemort's Horcrux",
    isProtected: false,
    canTalk: false,
    alignment: "EVIL",
  },
];

export const spells = [
  {
    id: "1",
    name: "Expelliarmus",
    type: "CHARM",
    description: "Disarming Charm",
    level: "EASY",
    effect: "Disarms opponent",
  },
  {
    id: "2",
    name: "Alohomora",
    type: "CHARM",
    description: "Unlocking Charm",
    level: "EASY",
    effect: "Unlocks doors",
  },
  {
    id: "3",
    name: "Avada Kedavra",
    type: "CURSE",
    description: "Killing Curse",
    level: "EXTREME",
    effect: "Kills opponent",
  },
  {
    id: "4",
    name: "Lumos",
    type: "CHARM",
    description: "Wand-Lighting Charm",
    level: "EASY",
    effect: "Illuminates wand tip",
  },
  {
    id: "5",
    name: "Obliviate",
    type: "CHARM",
    description: "Memory Charm",
    level: "HARD",
    effect: "Erases memories",
  },
  {
    id: "6",
    name: "Stupefy",
    type: "JINX",
    description: "Stunning Spell",
    level: "MEDIUM",
    effect: "Stuns opponent",
  },
  {
    id: "7",
    name: "Wingardium Leviosa",
    type: "CHARM",
    description: "Levitation Charm",
    level: "EASY",
    effect: "Levitates objects",
  },
  {
    id: "8",
    name: "Imperio",
    type: "CURSE",
    description: "Imperius Curse",
    level: "EXTREME",
    effect: "Controls opponent",
  },
  {
    id: "9",
    name: "Crucio",
    type: "CURSE",
    description: "Cruciatus Curse",
    level: "EXTREME",
    effect: "Inflicts pain on opponent",
  },
  {
    id: "10",
    name: "Confundo",
    type: "CHARM",
    description: "Confundus Charm",
    level: "MEDIUM",
    effect: "Confuses opponent",
  },
];

export default {
  characters,
  creatures,
  spells,
};
