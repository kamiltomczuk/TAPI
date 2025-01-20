const characterSchema = `
  scalar Date

  input StringFilter {
    eq: String
    contains: String
    notEq: String
    notContains: String
  }

  input NumberFilter {
    eq: Int
    gt: Int
    lt: Int
    gte: Int
    lte: Int
  }

  input DateFilter {
    eq: Date
    gt: Date
    lt: Date
    gte: Date
    lte: Date
  }

  input CharacterFilter {
    firstName: StringFilter
    lastName: StringFilter
    house: StringFilter
    bloodStatus: StringFilter
    role: Role
    isDeathEater: Boolean
    isOrderMember: Boolean
  }

  input CharacterInput {
    firstName: String!
    lastName: String!
    house: String
    bloodStatus: String
    role: Role
    wand: WandInput
    patronus: String
    isDeathEater: Boolean
    isOrderMember: Boolean
    birthDate: Date
    skills: [SkillInput]
  }

  input WandInput {
    wood: String!
    core: String!
    length: Float
    flexibility: String
  }

  input SkillInput {
    name: String!
    description: String
    proficiency: ProficiencyLevel
  }

  input SortInput {
    field: String!
    order: SortOrder = ASC
  }

  type CharacterConnection {
    edges: [CharacterEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type CharacterEdge {
    node: Character!
    cursor: String!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Mutation {
    createCharacter(character: CharacterInput!): Character
    updateCharacter(id: ID!, character: CharacterInput!): Character
    deleteCharacter(id: ID!): Boolean
  }


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
    magicalCreatures: [CharacterCreatureRelationship]
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

  type CharacterCreatureRelationship {
    creature: Creature!
    relationshipType: CreatureRelationType!
    details: String
  }

  enum CreatureRelationType {
    COMPANION
    FRIEND
    ENEMY
    GUARDIAN
    SERVANT
    FAMILIAR
    STUDENT
    MASTER
  }

  union RelatedEntity = Character | Creature

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
    link: String
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
    characters(
      filter: CharacterFilter
      sort: SortInput
      page: Int = 1
      pageSize: Int = 10
    ): CharacterConnection!
  }
`;

export default characterSchema;
