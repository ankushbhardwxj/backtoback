const express = require("express");
//const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
    schema {
      query: 
      mutation: 
    }
  `),
    rootValue: {},
  })
);

app.listen(3000, () => console.log("SERVER STARTED AT", 3000));
