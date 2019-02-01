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
      text: "Hello",
      blogId: 1
    },
    {
      id: 2,
      title: "Joey's Second Post",
      author: "Joey",
      text: "World",
      blogId: 1
    },
    {
      id: 3,
      title: "Ross's First Post",
      author: "Joey",
      text: "Hello",
      blogId: 2
    },
    {
      id: 4,
      title: "Ross's Second Post",
      author: "Joey",
      text: "World",
      blogId: 2
    }
  ]
};

const typeDefs = `
  interface Node {
    id: ID!
  }

  input PostCreateInput {
    title: String!
    author: String!
    text: String!
<<<<<<< HEAD
    blog: String!
=======
    blog: ID!
>>>>>>> Add postCreate mutation
  }

  type PostCreatePayload {
    post: Post
  }

  type Post implements Node {
    id: ID!
    title: String!
    author: String!
    text: String!
  }

  type Blog implements Node {
    id: ID!
    name: String!
    posts: [Post!]!
  }

  type Query {
    blog(id: ID!): Blog
    blogs: [Blog!]!
  }

  type Mutation {
    postCreate(input: PostCreateInput): PostCreatePayload!
  }
`;

const resolvers = {
  Query: {
    blog: (parent, args) => db.blogs.find(blog => blog.id == args.id),
    blogs: (parent, args) => db.blogs
  },
  Blog: {
    posts: (parent, args) => db.posts.filter(post => post.blogId == parent.id)
  },
  Mutation: {
    postCreate: (parent, args) => {
      const { input } = args;
      const blog = db.blogs.find(blog => blog.name === input.blog);

      if (!blog) throw new Error(input.blog + " not found!");

      const lastPost = db.posts[db.posts.length - 1];
      const newPost = { id: lastPost.id + 1, blogId: blog.id, ...input };

      db.posts.push(newPost);

      return { post: newPost };
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log(`Server is running at http://localhost:4000`));
