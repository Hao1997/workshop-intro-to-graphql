import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";
import "../styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBlogIndex: 0
    };
  }
  render() {
    return (
      <div className="App">
        <Mutation mutation={ADD_POST}>
          {postCreate => (
            <Query query={BLOGS_QUERY}>
              {props => {
                console.log(props);
                const { data, loading, error, refetch } = props;
                if (loading) {
                  return <div>Loading</div>;
                }

                if (error) {
                  return <div>An unexpected error occurred</div>;
                }

                return (
                  <div>
                    <h1>Site Name</h1>
                    <div>
                      <select value={this.state.selectedBlogIndex} onChange={e => this.setState({ selectedBlogIndex: e.target.value })}>
                        {data.blogs.map(
                          (blog, i) => <option key={blog.name} value={i}>{blog.name}</option>
                        )}
                      </select>
                    </div>
                    {data.blogs[this.state.selectedBlogIndex].posts.map(post => (
                      <article key={post.title} className="blogEntry">
                        <h2>{post.title}</h2>
                        <div>{post.author}</div>
                        <p>{post.text}</p>
                      </article>
                    ))}
                    <div className="newPostForm">
                      <div>
                        <label htmlFor="newPostAuthor">Author:</label>
                        <input type="text" value={this.state.newPostAuthor} id="newPostAuthor" onChange={e => this.setState({ newPostAuthor: e.target.value })} />
                      </div>
                      <div>
                        <label htmlFor="newPostTitle">Title:</label>
                        <input type="text" value={this.state.newPostTitle} id="newPostTitle" onChange={e => this.setState({ newPostTitle: e.target.value })} />
                      </div>
                      <div>
                        <label htmlFor="newPostText">Content:</label>
                        <textarea type="text" value={this.state.newPostText} id="newPostText" onChange={e => this.setState({ newPostText: e.target.value })} />
                      </div>
                      <div>
                        <button onClick={() => postCreate({
                          variables: {
                            blog: data.blogs[this.state.selectedBlogIndex].name,
                            author: this.state.newPostAuthor,
                            title: this.state.newPostTitle,
                            text: this.state.newPostText
                          }
                        }).then(() => refetch())}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }}
            </Query>
          )}
        </Mutation>
      </div>
    );
  }
}

const BLOGS_QUERY = gql`
  query BlogsQuery {
    blogs {
      name,
      posts {
        title,
        author,
        text
      }
    }
  }
`;

const ADD_POST = gql`
  mutation AddPost($blog: String!, $title: String!, $author: String!, $text: String!) {
    postCreate(input: { blog: $blog, title: $title, author: $author, text: $text}) {
      post {
        title,
        author,
        text
      }
    }
  }
`;

export default App;
