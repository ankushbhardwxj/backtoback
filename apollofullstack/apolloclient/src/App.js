import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "graphql-tag";

const User = ({ user: { login, avatar_url } }) => (
  <div>
    <img alt="avatar" src={avatar_url} />
    <h3> {login} </h3>
    <a href={`https://github.com/${login}`}> check out ! </a>
  </div>
);

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

const GET_USERS = gql`
  {
    users {
      id
      login
      avatar_url
    }
  }
`;

export default App;
