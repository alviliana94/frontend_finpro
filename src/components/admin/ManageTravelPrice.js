import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import cookies from 'universal-cookie'

import Sidebar from "./Sidebar";
import "../style.css";

const cookie = new cookies()

class ManageTravelPrice extends Component {
  state = {
    travel: [],
    transport: [],
    pet: [],
    size:[],
    selectedTravel: 0
  };

  componentDidMount() {
    this.getTravelList();
    this.getTransport();
    this.getSize();
    this.getPet();
  }

  getTravelList = () => {
    axios.get("http://localhost:1995/travel/pricelist").then(res => {
      this.setState({ travel: res.data, selectedTravel : 0 });
    });
  };
  getPet = () => {
    axios.get("http://localhost:1995/pet").then(res => {
      this.setState({ 
        pet: res.data
       });
    });
    console.log(this.state.pet);
    
  };
  getTransport = () => {
    axios.get("http://localhost:1995/transport").then(res => {
      this.setState({
        transport: res.data
      });   
      
    });
  };
  getSize = () => {
    axios.get("http://localhost:1995/size").then(res => {
      this.setState({
        size: res.data
      });
    });
  };

  selectPet = () => {
    return this.state.pet.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.category_name}
        </option>
      );
    });
  };
  selectTransport = () => {
    return this.state.transport.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.transport_name}
        </option>
      );
    });
  };
  selectSize = () => {
    return this.state.size.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.size_name}
        </option>
      );
    });
  };
  editTravel = id => {
    this.setState({selectedTravel : id})
  }
  saveEdit = id => {
    const pet_category_id = parseInt(this.selectedPet.value);
    const transport_category_id = parseInt(this.selectedTransport.value);
    const size_category_id = parseInt(this.selectedSize.value);
    const price = parseInt(this.editPrice.value);
    axios
      .patch(`http://localhost:1995/pricelist/edit/${id}`, {
        pet_category_id,
        transport_category_id,
        size_category_id,
        price
      })
      .then(() => {
        this.getTravelList();
      });
  }
 
  

  renderList = () => {
    
      
    return this.state.travel.map((item,index) => {
      if (item.id !== this.state.selectedTravel) {
        return (
          <tr key={item.id}>
            <td>{index+1}</td>
            <td>{item.PET}</td>
            <td>{item.TRANSPORT}</td>
            <td>{item.SIZE}</td>
            <td>{item.PRICE}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editTravel(item.id);
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
            <td>{index+1}</td>
            <td>
            <select
                className="form-control"
                ref={input => {
                  this.selectedPet = input;
                }}
              >
                {this.selectPet()}
              </select>
            </td>
            <td>
            <select
                className="form-control"
                ref={input => {
                  this.selectedTransport = input;
                }}
              >
                {this.selectTransport()}
              </select>
              </td>
            <td>
            <select
                className="form-control"
                ref={input => {
                  this.selectedSize = input;
                }}
              >
                {this.selectSize()}
              </select>
            </td>
            <td>
            <input
                className="form-control"
                ref={input => {
                  this.editPrice = input;
                }}
                type="text"
                defaultValue={item.PRICE}
              />
            </td>
            <td className="d-flex flex-column">
              <button
                onClick={() => {
                  this.saveEdit(item.id);
                }}
                className="btn btn-success mb-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ selectedTravel: 0 });
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
    }else{
      return (
        <div id="App">
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <div className="container">
              <h1 className="display-4 text-center">Travel Price</h1>
              <table className="table table-bordered mb-5">
                <thead>
                  <tr>
                    <th scope="col">NO</th>
                    <th scope="col">PET</th>
                    <th scope="col">TRANSPORT</th>
                    <th scope="col">SIZE</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>{this.renderList()}</tbody>
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

export default connect(mapStateToProps)(ManageTravelPrice);
