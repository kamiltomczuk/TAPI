const spellSchema = `

  scalar Date

  input SpellFilter {
    name: StringFilter
    type: SpellType
    level: SpellLevel
    effect: StringFilter
  }

  input SpellInput {
    name: String!
    type: SpellType!
    description: String
    level: SpellLevel
    effect: String
  }


  type SpellConnection {
    edges: [SpellEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }

  type SpellEdge {
    node: Spell!
    cursor: String!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
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
    spells(
      filter: SpellFilter
      sort: SortInput
      page: Int = 1
      pageSize: Int = 10
    ): SpellConnection!
  }

  type Mutation {
    createSpell(spell: SpellInput!): Spell
    updateSpell(id: ID!, spell: SpellInput!): Spell
    deleteSpell(id: ID!): Boolean
  }
`;

export default spellSchema;