const { gql, ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

// database layer
const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean },
});

const TodoDB = mongoose.model("Todo", TodoSchema);
const uri = "mongodb://localhost:27017/todos";
const opts = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(uri, opts)
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));

// graphql layer
const typeDefs = gql`
  type Todo {
    title: String
    completed: Boolean
  }

  type Query {
    getTodos: [Todo]
  }

  input TodoInput {
    title: String
    completed: Boolean
  }

  type Mutation {
    createTodo(todo: TodoInput): Todo
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
  Mutation: {
    // NOTE: there are 4 built in parameters here
    createTodo: async (parent, args) => {
      const { title, completed } = args.todo;
      const newTodoItem = new TodoDB({ title, completed });
      const newTodo = await newTodoItem.save();
      return { title: newTodo.title, completed: newTodo.completed };
    },
  },
  Query: {
    getTodos: async () => {
      const todoItems = await TodoDB.find();
      return todoItems.map((todo) => {
        return {
          title: todo.title,
          completed: todo.completed,
        };
      });
    },
  },
};

// server
new ApolloServer({ typeDefs, resolvers })
  .listen()
  .then(({ url }) => console.log(`Server: ${url}`))
  .catch((err) => console.log(err));
