import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import cookies from "universal-cookie";

import Sidebar from "./Sidebar";
import "../style.css";

const cookie = new cookies();

class ManageProduct extends Component {
  state = {
    transport: [],
    products: [],
    pet: [],
    size:[],
    selectedPet: 0,
    selectedProduct: 0,
    selectedTransport: 0,
    selectedSize:0
  };

  componentDidMount() {
    this.getProduct();
    this.getPet();
    this.getTransport();
    this.getSize();
  }
  getPet = () => {
    axios.get("http://localhost:1995/pet").then(res => {
      this.setState({ 
        pet: res.data,
        selectedPet: 0
       });
    });
    console.log(this.state.pet);
    
  };
  getTransport = () => {
    axios.get("http://localhost:1995/transport").then(res => {
      this.setState({
        transport: res.data,
        selectedTransport: 0
      });   
      
    });
  };
  getSize = () => {
    axios.get("http://localhost:1995/size").then(res => {
      this.setState({
        size: res.data,
        selectedSize:0
      });
    });
  };
  getProduct = () => {
    axios.get("http://localhost:1995/products").then(res => {
      this.setState({
        products: res.data,
        selectedProduct:0
      });
    });
  };

  savePet = async id => {
    const category_name = this.editPetName.value;
    const formData = new FormData()
    const pet_image = this.editImage.files[0]

    formData.append("pet_image", pet_image);
    formData.append("category_name", category_name);

    try{
      await axios
        .patch(`http://localhost:1995/pet/edit/${id}`, formData, {
         headers : {
          "Content-Type": "multipart/form-data"
         }
        })
        .then(() => {
          this.getPet();
        });
    }catch(err){
      console.log(err);
      
    }
      
  };
  saveTransport = async id => {
    const transport_name = this.editTransportName.value;
    const formData = new FormData()
    const transport_image = this.editImageTransport.files[0]

    formData.append("transport_image", transport_image);
    formData.append("transport_name", transport_name);

    try{
      await axios
        .patch(`http://localhost:1995/transport/edit/${id}`, formData, {
         headers : {
          "Content-Type": "multipart/form-data"
         }
        })
        .then(() => {
          this.getTransport();
        });
    }catch(err){
      console.log(err);
      
    }
  };
  saveProduct = async id => {
    const product_name = this.editProductName.value;
    console.log(product_name);
    

    try{
      await axios
        .patch(`http://localhost:1995/product/edit/${id}`,{
          product_name 
        })
        .then(() => {
          this.getProduct();
        });
    }catch(err){
      console.log(err);
      
    }
  };
  saveSize = async id => {
    const size_name = this.editSizeName.value; 
    console.log(size_name);
       

    try{
      await axios
        .patch(`http://localhost:1995/size/edit/${id}`,{
          size_name 
        })
        .then(() => {
          this.getSize();
        });
    }catch(err){
      console.log(err);
      
    }
  };
  editPet = id => {
    this.setState({ selectedPet: id });
  };
  editProduct = id => {
    this.setState({ selectedProduct: id });
  };
  editTransport = id => {
    this.setState({ selectedTransport: id });
  };
  editSize = id => {
    this.setState({ selectedSize: id });
  };
  

  renderPet = () => {
    return this.state.pet.map(item => {
      if (item.id !== this.state.selectedPet) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <img className="list" src={item.pet_image} alt={item.category_name}/>
            </td>
            <td>{item.category_name}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editPet(item.id);
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
            <div className="custom-file">
              <input
                className="w-100"
                ref={input => {
                  this.editImage = input;
                }}
                type="file"
                id="customFile"
              />
              <label class="custom-file-label" for="customFile"></label>
              </div>
            </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editPetName = input;
                }}
                type="text"
                defaultValue={item.category_name}
              />
            </td>
            <td className="d-flex flex-column">
              <button
                onClick={() => {
                  this.savePet(item.id);
                }}
                className="btn btn-success mb-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ selectedPet: 0 });
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
  renderTransport = () => {
    return this.state.transport.map(item => {
      if (item.id !== this.state.selectedTransport) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>
              <img className="list" src={item.transport_image} alt={item.transport_name}/>
            </td>
            <td>{item.transport_name}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editTransport(item.id);
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
            <div className="custom-file">
              <input
                className="w-100"
                ref={input => {
                  this.editImageTransport = input;
                }}
                type="file"
                id="customFile"
              />
              <label class="custom-file-label" for="customFile"></label>
              </div>
            </td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editTransportName = input;
                }}
                type="text"
                defaultValue={item.transport_name}
              />
            </td>
            <td className="d-flex flex-column">
              <button
                onClick={() => {
                  this.saveTransport(item.id);
                }}
                className="btn btn-success mb-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ selectedTransport: 0 });
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
    
    }
  renderProduct = () => {
    return this.state.products.map(item => {
      if (item.id !== this.state.selectedProduct) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.product_name}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editProduct(item.id);
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
                ref={input => {
                  this.editProductName = input;
                }}
                type="text"
                defaultValue={item.product_name}
              />
            </td>
            <td className="d-flex flex-column">
              <button
                onClick={() => {
                  this.saveProduct(item.id);
                }}
                className="btn btn-success mb-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ selectedProduct: 0 });
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
  renderSize = () => {
    return this.state.size.map(item => {
      if (item.id !== this.state.selectedSize) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.size_name}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => {
                  this.editSize(item.id);
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
                ref={input => {
                  this.editSizeName = input;
                }}
                type="text"
                defaultValue={item.size_name}
              />
            </td>
            <td className="d-flex flex-column">
              <button
                onClick={() => {
                  this.saveSize(item.id);
                }}
                className="btn btn-success my-1"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ selectedSize: 0 });
                }}
                className="btn btn-danger my-1"
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
          <Redirect to="/manageproduct" />
          <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <div id="page-wrap">
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <h4 className="text-center">Pet</h4>
                  <table className="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">IMAGE</th>
                        <th scope="col">NAME</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderPet()}</tbody>
                  </table>
                </div>
                
                <div className="col-6">
                  <h4 className="text-center">Transportation</h4>
                  <table className="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">IMAGE</th>
                        <th scope="col">TRANSPORT</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderTransport()}</tbody>
                  </table>
                </div>
              </div>
              <div className="row">
              <div className="col-6">
                  <h4 className="text-center">Product</h4>
                  <table className="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">PRODUCT</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderProduct()}</tbody>
                  </table>
                </div>
              <div className="col-6">
                  <h4 className="text-center">Size</h4>
                  <table className="table table-bordered mb-5">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">SIZE</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderSize()}</tbody>
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

export default connect(mapStateToProps)(ManageProduct);
