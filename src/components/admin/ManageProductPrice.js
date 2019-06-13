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
    productlist: [],
    transport: [],
    pet: [],
    size:[],
    products:[],
    selectedProduct: 0
  };

  componentDidMount() {
    this.getProductList();
    this.getTransport();
    this.getSize();
    this.getProduct();
    this.getPet();
  }

  getProductList = () => {
    axios.get("http://localhost:1995/product/pricelist").then(res => {
      this.setState({ productlist: res.data, selectedProduct : 0 });
    });
  };
  getPet = () => {
    axios.get("http://localhost:1995/pet").then(res => {
      this.setState({ 
        pet: res.data
       });
    });
    
  };
  getProduct = () => {
    axios.get("http://localhost:1995/products").then(res => {
      this.setState({
        products: res.data
      });
    });
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

  selectProduct = () => {
    return this.state.products.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.product_name}
        </option>
      );
    });
  };
  selectCategory = () => {
    return this.state.pet.map(item => {
      return (
        <option key={item.id} value={item.id}>
          {item.category_name}
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

  addProductlist = async () => {
    const formData = new FormData();
    const image = this.imageProduct.files[0];
    const product = parseInt(this.selectedProduct.value)
    const category = parseInt(this.selectedCategory.value)
    const size = parseInt(this.selectedSize.value)
    const price = parseInt(this.addPrice.value)


    formData.append("product_image", image);
    formData.append("product_name_id", product);
    formData.append("product_category_id", category);
    formData.append("product_size_id", size);
    formData.append("price", price);
    try {
      const res = await axios.post(
        `http://localhost:1995/product/pricelist/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      this.getProductList();
    } catch (e) {
      console.log("upload gagal" + e);
    }
  };
 
  

  renderList = () => {
    
      
    return this.state.productlist.map((item,index) => {
      if (item.id !== this.state.selectedTravel) {
        return (
          <tr key={item.id}>
            <td>{index+1}</td>
            <td>{item.product}</td>
            <td>{item.category}</td>
            <td>{item.size}</td>
            <td>{item.price}</td>
            <td>
            <img className="list" src={item.image} alt={item.product}/>
            </td>
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
                {this.selectProduct()}
              </select>
            </td>
            <td>
            <select
                className="form-control"
                ref={input => {
                  this.selectedTransport = input;
                }}
              >
                {this.selectCategory()}
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
              <h1 className="display-4 text-center">Product Price</h1>
              <table className="table table-bordered mb-5">
                <thead>
                  <tr>
                    <th scope="col">NO</th>
                    <th scope="col">NAME</th>
                    <th scope="col">CATEGORY</th>
                    <th scope="col">SIZE</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">IMAGE</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>{this.renderList()}</tbody>
              </table>
              <h1 className="display-4 text-center">Add Product Pricelist</h1>
              <table className="table table-bordered mb-5">
                <thead>
                  <tr>
                    <th scope="col">NO</th>
                    <th scope="col">NAME</th>
                    <th scope="col">CATEGORY</th>
                    <th scope="col">SIZE</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">IMAGE</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
            <td></td>
            <td>
            <select
                className="form-control"
                ref={input => {
                  this.selectedProduct = input;
                }}
              >
                {this.selectProduct()}
              </select>
            </td>
            <td>
            <select
                className="form-control"
                ref={input => {
                  this.selectedCategory = input;
                }}
              >
                {this.selectCategory()}
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
                  this.addPrice = input;
                }}
                type="text"
              />
            </td>
            <td>
              <div className="custom-file">
              <input
                className="w-100"
                ref={input => {
                  this.imageProduct = input;
                }}
                type="file"
                id="customFile"
              />
              <label class="custom-file-label" for="customFile"></label>
              </div>
            </td>
            <td className="d-flex flex-column">
              <button
                onClick={this.addProductlist}
                className="btn btn-success mb-2"
              >
                Add
              </button>
              </td>
          </tr>
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

export default connect(mapStateToProps)(ManageTravelPrice);
