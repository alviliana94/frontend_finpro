import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import cookies from 'universal-cookie'

import Sidebar from "./Sidebar";
import "../style.css";

const cookie = new cookies()

class ManageAuthorPublisher extends Component {
  state = {
    author: [],
    publisher:[],
    selectedAuthor: 0,
    selectedPublisher: 0
  };

  componentDidMount() {
    this.getAuthor();
    this.getPublisher();
  }

  getAuthor = () => {
    axios.get("http://localhost:2000/author").then(res => {
      this.setState({ author: res.data, selectedAuthor: 0 });
    });
  };
  getPublisher = () => {
    axios.get("http://localhost:2000/publisher").then(res => {
      this.setState({ publisher: res.data, selectedPublisher: 0 });
    });
  };
  saveAuthor = (id) => {
      const author_name = this.editAuthor.value
      axios.patch(`http://localhost:2000/author/edit/${id}`, {
          author_name
      }).then(() => {
          this.getAuthor()
      })
  }
  savePublisher = (id) => {
      const publisher_name = this.editPublisher.value
      console.log(publisher_name);
      
      axios.patch(`http://localhost:2000/publisher/edit/${id}`, {
          publisher_name
      }).then(() => {
          this.getPublisher()
      })
  }
  editAuthorName = (id) => {
      this.setState({ selectedAuthor: id })
  }
  editPublisherName = (id) => {
      this.setState({ selectedPublisher: id })
  }
  onAddAuthor = () => {
    const author_name = this.author.value
      this.addAuthor(author_name)

  }
  onAddPublisher = () => {
    const publisher_name = this.publisher.value
      this.addPublisher(publisher_name)

  }
  addAuthor = (author_name) => {
    axios.post("http://localhost:2000/author/add", {
      author_name
    }).then(res => {
      console.log(res);
          this.getAuthor()
      })
  }
  addPublisher = (publisher_name) => {
    axios.post("http://localhost:2000/publisher/add", {
      publisher_name
    }).then(res => {
      console.log(res);
          this.getPublisher()
      })
  }

  renderAuthor = () => {
    return this.state.author.map(item => {
      if (item.id !== this.state.selectedAuthor) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.author_name}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editAuthorName(item.id);
                }}
              >
                Edit
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <input 
                className="form-control"
                ref={input => {this.editAuthor = input}}
                type="text"
                defaultValue={item.author_name}
              />
            </td>
            <td>
              <button
                onClick={() => {
                  this.saveAuthor(item.id);
                }}
                className="btn btn-success mb-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ selectedAuthor: 0 });
                }}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </td>
          </tr>
        );
      }
    });
  };
  renderPublisher = () => {
    return this.state.publisher.map(item => {
      if (item.id !== this.state.selectedPublisher) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.publisher_name}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editPublisherName(item.id);
                }}
              >
                Edit
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <input 
                className="form-control"
                ref={input => {this.editPublisher = input}}
                type="text"
                defaultValue={item.publisher_name}
              />
            </td>
            <td>
              <button
                onClick={() => {
                  this.savePublisher(item.id);
                }}
                className="btn btn-success mb-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ selectedPublisher: 0 });
                }}
                className="btn btn-danger"
              >
                Cancel
              </button>
            </td>
          </tr>
        );
      }
    });
  };

  render() {
    var userCookie = cookie.get("stillLogin");

    if (userCookie === undefined ) {
      return (
        <Redirect to="/admin/login" />
      ) 
    } else{
      return (
        <div id="App">
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <div className="container">
                <div className="row">

                <div className="col-6">
              <h3 className="text-center">Author Table</h3>
              <table className="table table-hover mb-5">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>{this.renderAuthor()}</tbody>
              </table>
              <h3 className="text-center">Input Author</h3>
              <table className="table text-center">
                <thead>
                  <tr>
                  <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <th scope="col">ID</th>
                    <th scope="col">
                      <input
                        ref={input => (this.author = input)}
                        className="form-control"
                        type="text"
                      />
                    </th>
                    <th scope="col">
                      <button
                        className="btn btn-outline-warning"
                        onClick={this.onAddAuthor}
                      >
                        Add
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
                </div>
                <div className="col-6">
              <h3 className="text-center">Publisher Table</h3>
              <table className="table table-hover mb-5">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>{this.renderPublisher()}</tbody>
              </table>
              <h3 className="text-center">Input Publisher</h3>
              <table className="table text-center">
                <thead>
                  <tr>
                  <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <th scope="col">ID</th>
                    <th scope="col">
                      <input
                        ref={input => (this.publisher = input)}
                        className="form-control"
                        type="text"
                      />
                    </th>
                    <th scope="col">
                      <button
                        className="btn btn-outline-warning"
                        onClick={this.onAddPublisher}
                      >
                        Add
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
                </div>
                </div>
            </div>
          </div>
        </div>
      );
    } 
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(mapStateToProps)(ManageAuthorPublisher);
