const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

// type definitions (Step 1)
const typeDefs = gql`
  # object user
  type User {
    id: ID
    login: String
    avatar_url: String
  }

  # query returns array of users
  type Query {
    users: [User]
  }
`;

// define resolvers (Step 2)
const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await axios.get("https://api.github.com/users");
        return users.data.map(({ id, login, avatar_url }) => ({
          id,
          login,
          avatar_url,
        }));
      } catch (err) {
        throw err;
      }
    },
  },
};

// creating the server
new ApolloServer({
  typeDefs,
  resolvers,
})
  .listen()
  .then(({ url }) => console.log(`Server running at ${url}`))
  .catch((err) => console.log(err));
