/** @format */

import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
      age
      isMarried 
    }
  }
`;

function App() {
  const [newUser, setNewUser] = React.useState({});
  const {
    data: result1,
    loading: loading1,
    error: error1,
  } = useQuery(GET_USERS);
  const {
    data: result2,
    loading: loading2,
    error: error2,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: "2" },
  });

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  console.log("result2===", result2);
  console.log("createUser===", data, loading, error);

  if (loading1) return <p>loading...</p>;
  if (error1) return <p>`Error: ${error.message}`</p>;

  const handleCreateUser = async () => {
    console.log("newUser===", newUser);
    createUser({
      variables: {
        name: newUser.name,
        age: 63,
        isMarried: false,
      },
    });
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setNewUser((prev) => ({ ...prev, name: val }));
  };

  return (
    <>
      <div>
        {/* <div><input type="text" placeholder="name..." onChange={(e) =>  setNewUser((prev) =>({...prev, name: e.target.value}))}/></div> */}
        <div>
          <input type="text" placeholder="name..." onChange={handleChange} />
        </div>
        <div>
          <input
            type="text"
            placeholder="age..."
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, age: e.target.value }))
            }
          />
        </div>
        <div>
          <button onClick={handleCreateUser}>Create user</button>
        </div>
      </div>

      {loading2 ? (
        <p>loading...</p>
      ) : (
        <>
          <h2>Chosen User</h2>
          <p>Name: {result2?.getUserById?.name}</p>
        </>
      )}

      <h2>Users</h2>
      <div>
        {result1 &&
          result1.getUsers &&
          result1.getUsers.map(({ name, age, isMarried }, index) => (
            <div key={index}>
              {name && <p>Name: {name}</p>}
              {age && <p>Age: {age}</p>}
              {isMarried && (
                <p>Is this user married: {isMarried ? "YES" : "NO"}</p>
              )}
              ===================================================
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
