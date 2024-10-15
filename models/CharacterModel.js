const { buildSchema } = require('graphql');

// Definiowanie schematu
const schema = buildSchema(`
  # Definicja typu Character
  type Character {
    id: ID!
    firstName: String!
    lastName: String
    fullName: String!
    house: House
    bloodStatus: BloodStatus
    wand: Wand
    patronus: String
    isDeathEater: Boolean
    isOrderMember: Boolean
    role: Role
    birthDate: String
    deathDate: String
    ancestry: String
    skills: [Skill!]!
    magicalCreaturesInteracted: [MagicalCreature!]!
    friends: [Relationship!]!
    enemies: [Relationship!]!
    notableEvents: [Event!]!
    favoriteSpells: [Spell!]!
    affiliations: [Affiliation!]!
    quotes: [Quote!]!
  }

  # Typ dla domu
  enum House {
    GRYFFINDOR
    HUFFLEPUFF
    RAVENCLAW
    SLYTHERIN
  }

  # Typ dla statusu krwi czarodzieja
  enum BloodStatus {
    PUREBLOOD
    HALF_BLOOD
    MUGGLE_BORN
  }

  # Typ różdżki
  type Wand {
    wood: String
    core: String
    length: Float
    flexibility: String
  }

  # Typ roli postaci
  enum Role {
    STUDENT
    TEACHER
    AUROR
    MINISTER_OF_MAGIC
    DEATH_EATER
    ORDER_MEMBER
    OTHER
  }

  # Typ umiejętności
  type Skill {
    name: String!
    description: String
    proficiency: ProficiencyLevel
  }

  # Typ poziomu zaawansowania w umiejętnościach
  enum ProficiencyLevel {
    NOVICE
    INTERMEDIATE
    ADVANCED
    MASTER
  }

  # Typ dla magicznych stworzeń
  type MagicalCreature {
    name: String!
    species: String!
    description: String
  }

  # Typ relacji
  type Relationship {
    character: Character!
    relationshipType: RelationshipType!
  }

  # Typ relacji postaci
  enum RelationshipType {
    FRIEND
    ENEMY
    ALLY
    RIVAL
    FAMILY
  }

  # Typ wydarzeń
  type Event {
    name: String!
    date: String
    description: String
  }

  # Typ zaklęć
  type Spell {
    name: String!
    type: SpellType
    description: String
  }

  # Typ dla rodzajów zaklęć
  enum SpellType {
    CHARM
    CURSE
    HEX
    JINX
    TRANSFIGURATION
    OTHER
  }

  # Typ afiliacji
  type Affiliation {
    name: String!
    role: String
    description: String
  }

  # Typ cytatów
  type Quote {
    text: String!
    situation: String
  }

  # Główne zapytania
  type Query {
    character(id: ID!): Character
    characters: [Character!]!
  }
`);

module.exports = schema;
