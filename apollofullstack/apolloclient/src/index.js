import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";

const User = ({ user: { login, avatar_url } }) => (
  <div>
    <img alt="avatar" src={avatar_url} />
    <h3> {login} </h3>
    <a href={`https://github.com/${login}`}> check out ! </a>
  </div>
);

// useQuery to run gql statement inside component
const App = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  if (error) return <h1> ERROR! </h1>;
  if (loading) return <h1> Loading users...</h1>;
  return (
    <div>
      <h1> Github users </h1>
      {data.users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

// query using gql (step 3)
const GET_USERS = gql`
  {
    users {
      id
      login
      avatar_url
    }
  }
`;

// start apollo client and pass uri of graphql server (step 2)
const client = new ApolloClient({
  uri: "http://localhost:4000",
});

// Apollo client provider (step 1)
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
