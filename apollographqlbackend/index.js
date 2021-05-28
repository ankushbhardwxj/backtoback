const { ApolloServer, gql } = require("apollo-server");

// graphql schema definition
const typeDefs = gql`
  # alias
  type Book {
    title: String
    author: String
  }

  type Money {
    amount: Int
  }
  # server executes query named "books"
  # and returns array of Book
  type QueryBooks {
    books: [Book]
  }

  type QueryMoney {
    money: Money
  }
`;

// dataset - db, api, static storage
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const money = 21;

// defining resolvers - retrieve books from booksArray
const resolvers = {
  QueryBooks: {
    books: () => books,
  },
  QueryMoney: {
    money: () => money,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen()
  .then(({ url }) => {
    console.log(`Server at ${url}`);
  })
  .catch((err) => console.log(err));
