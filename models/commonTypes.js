export const commonTypes = `
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

  input SortInput {
    field: String!
    order: SortOrder = ASC
  }

  enum SortOrder {
    ASC
    DESC
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
`;