const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const app = express();

// schema & resolvers for graphql
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");

// end point for graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

const uri = "mongodb://localhost:27017/test";
const opts = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(uri, opts)
  .then(() => app.listen(3000, () => console.log("Server running")))
  .catch((err) => {
    throw err;
  });
