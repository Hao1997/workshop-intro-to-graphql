import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import "../styles/App.css";

class App extends Component {
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
                  <select>
                    {data.blogs.map(blog => (<option key={blog.name}>{blog.name}</option>))}
                  </select>
                </div>
                {
                  [1, 2, 3].map(n => (
                    <article key={n} className="blogEntry">
                      <h2>Article {n}</h2>
                      <div>Author {n}</div>
                      <p>Article text</p>
                    </article>
                  ))
                }
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
      name
    }
  }
`;

export default App;
