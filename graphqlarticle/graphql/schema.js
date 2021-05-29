const { buildSchema } = require("graphql");

// graphql schema
module.exports = buildSchema(`

# the article object
type Article {
  _id: ID!
  title: String!
  body: String!
  createdAt: String!
}

# the article input object
input ArticleInput {
  title: String!
  body: String!
}

# query should fetch an array of all articles
type Query {
  articles: [Article!]
}

# mutation to create an article
type Mutation {
  createArticle(article:ArticleInput): Article
}

# final schema
schema {
  query: Query
  mutation: Mutation
}
`);
