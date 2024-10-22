const spellSchema = `
  type Spell {
    id: ID!
    name: String!
    type: SpellType
    description: String
    level: SpellLevel
    effect: String
  }

  enum SpellType {
    CHARM
    CURSE
    HEX
    JINX
    TRANSFIGURATION
    OTHER
  }

  enum SpellLevel {
    EASY
    MEDIUM
    HARD
    EXTREME
  }

  type Query {
    spell(id: ID!): Spell
    spells: [Spell!]!
  }
`;

export default spellSchema;