/** @format */

import React, { useState } from "react";
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers($city: String) {
    getUsers(city: $city) {
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

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      name
      id
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({});
  const {
    data: result1,
    loading: loading1,
    error: error1,
  } = useQuery(GET_USERS, {
    variables: {
      city: "Hong Kong",
    },
  });
  const {
    data: result2,
    loading: loading2,
    error: error2,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: "2" },
  });

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [
      GET_USERS, // DocumentNode object parsed with gql
    ],
  });

  const [deleteUser, { data: data3, loading: loading3, error: errro3 }] =
    useMutation(DELETE_USER, {
      refetchQueries: [
        GET_USERS, // DocumentNode object parsed with gql
      ],
    });

  if (loading1) return <p>loading...</p>;
  if (error1) return <p>`Error: ${error.message}`</p>;

  const handleCreateUser = async () => {
    await createUser({
      variables: {
        name: newUser.name,
        age: parseInt(newUser.age),
        isMarried: false,
      },
    });
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setNewUser((prev) => ({ ...prev, name: val }));
  };

  const deleteSelectedUser = async (id) => {
    await deleteUser({
      variables: {
        id: id,
      },
    });
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
      ==========================================
      <h2>Users</h2>
      <div>
        {result1 &&
          result1.getUsers &&
          result1.getUsers.map(({ id, name, age, isMarried }, index) => (
            <div key={index}>
              {name && <p>Name: {name}</p>}
              {age && <p>Age: {age}</p>}
              {isMarried && (
                <p>Is this user married: {isMarried ? "YES" : "NO"}</p>
              )}
              <div>
                <button onClick={() => deleteSelectedUser(id)}>Delete</button>
              </div>
              ===================================================
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
