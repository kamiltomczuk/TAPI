// creatureModel.js
const creatureSchema = `
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
    creatures: [Creature!]!
    creaturesByType(species: String!): [Creature!]!
  }
`;

export default creatureSchema;
