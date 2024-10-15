const { buildSchema } = require('graphql');

const schema = buildSchema(`
  # Typ zaklęcia
  type Spell {
    id: ID!
    name: String!
    type: SpellType
    description: String
    level: SpellLevel
    effect: String
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

  # Typ poziomu trudności zaklęcia
  enum SpellLevel {
    EASY
    MEDIUM
    HARD
    EXTREME
  }

  # Query dla zaklęć
  type Query {
    spell(id: ID!): Spell
    spells: [Spell!]!
  }
`);

module.exports = schema;
