import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import logo from "../logo.svg";
import "../styles/App.css";
import InputName from "./InputName";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Query query={HELLO_QUERY}>
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
                    <option>Blog 1</option>
                    <option>Blog 2</option>
                    <option>Blog 3</option>
                  </select>
                </div>
                {[1, 2, 3].map(n => (
                  <article className="blogEntry">
                    <h2>Article {n}</h2>
                    <div>Author {n}</div>
                    <p>Blog content</p>
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

const HELLO_QUERY = gql`
  query BlogsQuery {
    blogs {
      name
    }
  }
`;

export default App;
