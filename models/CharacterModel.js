const characterSchema = `
  type Character {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
    house: String
    bloodStatus: String
    wand: Wand
    patronus: String
    isDeathEater: Boolean
    isOrderMember: Boolean
    role: Role
    birthDate: String
    deathDate: String
    ancestry: String
    skills: [Skill]
    magicalCreaturesInteracted: [MagicalCreature]
    friends: [Relationship]
    enemies: [Relationship]
    notableEvents: [Event]
    favoriteSpells: [Spell]
    affiliations: [Affiliation]
    quotes: [Quote]
  }

  type Wand {
    wood: String
    core: String
    length: Float
    flexibility: String
  }

  enum Role {
    STUDENT
    TEACHER
    AUROR
    MINISTER_OF_MAGIC
    DEATH_EATER
    ORDER_MEMBER
    OTHER
  }

  type Skill {
    name: String!
    description: String
    proficiency: ProficiencyLevel
  }

  enum ProficiencyLevel {
    NOVICE
    INTERMEDIATE
    ADVANCED
    MASTER
  }

  type MagicalCreature {
    name: String!
    species: String
    description: String
  }

  type Relationship {
    id: ID!
    relationshipType: String
    character: FriendEnemyCharacter
  }

  type FriendEnemyCharacter {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
  }

  type Event {
    name: String
    date: String
    description: String
  }

  type Affiliation {
    name: String
    role: String
    description: String
  }

  type Quote {
    text: String
    situation: String
  }

  type Query {
    character(id: ID!): Character
    characters: [Character!]!
  }
`;

export default characterSchema;