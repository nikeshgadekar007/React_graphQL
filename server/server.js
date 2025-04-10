import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  { id: "1", name: "Nikesh", age: 32, isMarried: true },
  { id: "2", name: "Dipesh", age: 32, isMarried: true },
  { id: "3", name: "Amit", age: 39, isMarried: true },
];

const typeDefs = `
		type Query {
			getUsers: [User]
	    getUserById(id: ID!): User

		}
		type Mutation {
			createUser(name: String!, age: Int!, isMarried: Boolean!): User
      upadateUser(id: ID!, name: String!, age: Int!, isMarried: Boolean!): [User]
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
    getUsers: () => {
      return users;
    },
    getUserById: (parent, args) => {
      const id = args.id;
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
      return users
    },
    upadateUser: (parent, args) => {
      const { id, name, age, isMarried } = args;

      const updateUser = (users, id, newValues) => {
         return users.map(user => 
           user.id === id ? { ...user, ...newValues } : user
         );
        };
    console.log("Nikesh====")
      const newData =  updateUser(users, id, { id, name, age, isMarried });
      return newData;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server running at: ${url}`);
