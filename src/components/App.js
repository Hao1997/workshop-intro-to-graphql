import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
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
              </div>
            );
          }}
        </Query>
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

export default App;
