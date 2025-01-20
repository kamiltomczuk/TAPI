// creatureModel.js
const creatureSchema = `

  input CreatureFilter {
    name: StringFilter
    species: StringFilter
    dangerLevel: DangerLevel
    habitat: StringFilter
    alignment: CreatureAlignment
    canTalk: Boolean
    isProtected: Boolean
  }

  input CreatureInput {
    name: String!
    species: String!
    description: String
    dangerLevel: DangerLevel
    habitat: String
    abilities: [String]
    isProtected: Boolean
    canTalk: Boolean
    alignment: CreatureAlignment
  }

  type CreatureConnection {
    edges: [CreatureEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type CreatureEdge {
    node: Creature!
    cursor: String!
  }

  type Mutation {
    createCreature(creature: CreatureInput!): Creature
    updateCreature(id: ID!, creature: CreatureInput!): Creature
    deleteCreature(id: ID!): Boolean
  }

  type Creature {
    id: ID!
    name: String!
    species: String!
    description: String
    dangerLevel: DangerLevel
    habitat: String
    abilities: [String]
    knownFor: String
    isProtected: Boolean
    canTalk: Boolean
    alignment: CreatureAlignment
    interactions: [Interaction]
  }

  enum DangerLevel {
    HARMLESS
    LOW
    MODERATE
    HIGH
    EXTREME
  }

  enum CreatureAlignment {
    GOOD
    NEUTRAL
    EVIL
    UNKNOWN
  }

  type Interaction {
    characterId: ID!
    character: Character
    type: InteractionType
    description: String
  }

  enum InteractionType {
    FRIENDLY
    HOSTILE
    NEUTRAL
    GUARDIAN
    SERVANT
  }

  type Query {
    creature(id: ID!): Creature
    creatures(
      filter: CreatureFilter
      sort: SortInput
      page: Int = 1
      pageSize: Int = 10
    ): CreatureConnection!
  }
`;

export default creatureSchema;
