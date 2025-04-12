/** @format */

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  { id: "1", name: "Nikesh", age: 32, isMarried: true },
  { id: "2", name: "Dipesh", age: 32, isMarried: true },
  { id: "3", name: "Amit", age: 39, isMarried: true },
];

const typeDefs = `
  type Query {
    getUsers(city: String): [User]
    getUserById(id: ID!): User
  }
  type Mutation {
    createUser(name: String!, age: Int!, isMarried: Boolean!): User
    updateUser(id: ID!, name: String!, age: Int!, isMarried: Boolean!): [User]
    deleteUser(id: ID!): [User]
  }
  type User {
    id: ID
    name: String
    age: Int
    isMarried: Boolean
  }
`;

const resolvers = {
  Query: {
    getUsers: (parent, { city }) => {
      console.log("city====", city);
      return users;
    },
    getUserById: (parent, args) => {
      const id = args.id;
      if (!id) {
        return users;
      }
      return users.find((user) => user.id === id);
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, age, isMarried } = args;

      const newUser = {
        id: (users.length + 1).toString(),
        name,
        age,
        isMarried,
      };

      users.push(newUser);
      return users;
    },
    updateUser: (parent, args) => {
      const { id, name, age, isMarried } = args;

      const updateUser = (users, id, newValues) => {
        return users.map((user) =>
          user.id === id ? { ...user, ...newValues } : user
        );
      };
      return updateUser(users, id, { id, name, age, isMarried });
    },
    deleteUser: (parent, args) => {
      const { id } = args;
      if (!id) {
        return users;
      }
      return users.filter((user) => user.id !== id);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server running at: ${url}`);
