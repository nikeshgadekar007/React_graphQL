<<<<<<< HEAD
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const users = [
  { id: "1", name: "Nikesh", age: 32, isMarried: true },
  { id: "2", name: "Dipesh", age: 32, isMarried: true },
  { id: "3", name: "Amit", age: 39, isMarried: true },
];
=======
import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from '@apollo/server/standalone';

const users = [
	{id: "1", name:"Nikesh", age: 32, isMarried: true},
	{id: "2", name:"Dipesh", age: 32, isMarried: true},
	{id: "3", name:"Amit", age: 39, isMarried: true}
]
>>>>>>> 9fca5bf705395927142b12d14df1be047e9f4ca8

const typeDefs = `
		type Query {
			getUsers: [User]
<<<<<<< HEAD
	    getUserById(id: ID!): User

		}
		type Mutation {
		  createUser(name: String!, age: Int!, isMarried: Boolean!): User
          upadateUser(id: ID!, name: String!, age: Int!, isMarried: Boolean!): [User]
          deleteUser(id : ID!) : [User]
            }
=======
	        getUserById(id: ID!): User

		}
		type Mutation {
			createUser(name: String!, age: Int!, isMarried: Boolean!): User
		}
>>>>>>> 9fca5bf705395927142b12d14df1be047e9f4ca8
		type User {
			id: ID
			name: String
			age: Int
			isMarried: Boolean 
		}
<<<<<<< HEAD
`;

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getUserById: (parent, args) => {
      const id = args.id;
      if(!id) {
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
      return users
    },
    upadateUser: (parent, args) => {
      const { id, name, age, isMarried } = args;

      const updateUser = (users, id, newValues) => {
         return users.map(user => 
           user.id === id ? { ...user, ...newValues } : user
         );
        };
      const newData =  updateUser(users, id, { id, name, age, isMarried });
      return newData;
    },
    deleteUser: (parent, args) => {
      const {id} = args;
      if(!id){
        return users;
      };
      return users.filter(user => user.id !== id);
    }
  },
};  

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server running at: ${url}`);
=======
`

const resolvers = { 
	Query: {
		getUsers: () => {
			return users;
		},
		getUserById: (parent, args) => {
			const id = args.id;
			alert('dsadsa', id)
			return users.find((user) => user.id === id);
		}
	},
	Mutation: {
		createUser: (parent, args) => {

			const {name, age, isMarried} = args;

			const newUser = {
				id: (users.length + 1).toString(),
				name,
				age,
				isMarried
			};

			users.push(newUser);

		}
	}
}

const server = new ApolloServer({typeDefs, resolvers});

const {url} = await startStandaloneServer(server, {
	listen: {port: 4000}
})

console.log(`Server running at: ${url}`);
>>>>>>> 9fca5bf705395927142b12d14df1be047e9f4ca8
