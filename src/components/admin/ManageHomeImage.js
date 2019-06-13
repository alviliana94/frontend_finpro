import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import cookies from "universal-cookie";

import Sidebar from "./Sidebar";
import "../style.css";

const cookie = new cookies();

class ManageHomeImage extends Component {
  state = {
    image: [],
    selectedID: 0
  };

  componentDidMount() {
    this.getImage();
  }

  getImage = () => {
    axios.get("http://localhost:1995/home/show").then(res => {
      this.setState({
        image: res.data,
        selectedID:0
    });
    console.log(res.data);
      
    });
  };

  editImage = (id) => {
    this.setState({selectedID:id})
  }

  saveImage = async id => {
    const formData = new FormData()
    const image = this.imageEdit.files[0]

    formData.append("image", image);

    try{
      await axios
        .patch(`http://localhost:1995/home/edit/${id}`, formData, {
         headers : {
          "Content-Type": "multipart/form-data"
         }
        })
        .then(() => {
          this.getImage();
        });
    }catch(err){
      console.log(err);
      
    }
      
  };

  addImage = async () => {
    const formData = new FormData();
    const image = this.image.files[0];

    formData.append("image", image);
    try {
      const res = await axios.post(
        `http://localhost:1995/home/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      this.getImage();
    } catch (e) {
      console.log("upload gagal" + e);
    }
  };

  renderImage = () => {
    return this.state.image.map((item,index) => {
      if (item.id !== this.state.selectedID) {
        return (
          <tr key={item.id}>
            <td className="my-auto">{item.id}</td>
            <td>
              <img className="home" src={item.image} alt={"promo"} />
            </td>
            <td className="my-auto">
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editImage(item.id);
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
            <td scope="col">{item.id}</td>
            <td scope="col">
              <div className="custom-file">
                <input
                  type="file"
                  id="myfile"
                  ref={input => (this.imageEdit = input)}
                  className="custom-file-input"
                />
                <label className="custom-file-label" />
              </div>
            </td>
            <td className="d-flex flex-column">
              <button
                onClick={() => {
                  this.saveImage(item.id);
                }}
                className="btn btn-success mb-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ selectedID: 0 });
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

    if (userCookie === undefined) {
      return <Redirect to="/admin/login" />;
    } else {
      return (
        <div id="App">
          <Redirect to="/managehomeimage" />
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <div className="container">
                  <h4 className="text-center">Image Home</h4>
                  <table className="table table-hover">
                <thead>
                  <th scope="col">ID</th>
                  <th scope="col">IMAGE</th>
                  <th scope="col">ACTION</th>
                </thead>
                <tbody>{this.renderImage()}</tbody>
              </table>
              <h1 className="display-4 text-center">Input Promo</h1>
              <table className="table table-hover">
                <thead>
                  <th scope="col">ID</th>
                  <th scope="col">IMAGE</th>
                  <th scope="col">ACTION</th>
                </thead>
                <tbody>
                  <th scope="col">ID</th>
                  <th scope="col">
                    <div className="custom-file">
                      <input
                        type="file"
                        id="myfile"
                        ref={input => (this.image = input)}
                        className="custom-file-input"
                      />
                      <label className="custom-file-label" />
                    </div>
                  </th>
                  <th scope="col">
                    <button
                      className="btn btn-outline-success"
                      onClick={this.addImage}
                    >
                      Add
                    </button>
                  </th>
                </tbody>
              </table>
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

export default connect(mapStateToProps)(ManageHomeImage);
