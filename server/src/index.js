const { GraphQLServer } = require("graphql-yoga");

const db = {
  blogs: [
    {
      id: 1,
      name: "Joey's Blog"
    },
    {
      id: 2,
      name: "Ross's Blog"
    }
  ],
  posts: [
    {
      id: 1,
      title: "Joey's First Post",
      author: "Joey",
      text: "Hello"
    },
    {
      id: 2,
      title: "Joey's Second Post",
      author: "Joey",
      text: "World"
    },
    {
      id: 3,
      title: "Ross's First Post",
      author: "Joey",
      text: "Hello"
    },
    {
      id: 4,
      title: "Ross's Second Post",
      author: "Joey",
      text: "World"
    }
  ]
};

const typeDefs = `
  interface Node {
    id: ID!
  }

  type Blog implements Node {
    id: ID!
    name: String!
  }

  type Query {
    blog(id: ID!): Blog
    blogs: [Blog!]!
  }
`;

const resolvers = {
  Query: {
    blog: (parent, args) => db.blogs.find(id => args.id),
    blogs: (parent, args) => db.blogs
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log(`Server is running at http://localhost:4000`));
