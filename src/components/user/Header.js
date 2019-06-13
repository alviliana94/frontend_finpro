import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import cookies from "universal-cookie";

import { Logout } from "../../actions";
import {onLoginClick} from '../../actions'
import {afterTwoSeconds} from '../../actions'
import image from '../../img/avatar2.jpg'

const cookie = new cookies();

class Header extends Component {
  state = {
    data: undefined
  };
  componentDidMount() {
    const userid = cookie.get("idLogin");
    this.getProfile(userid);
  }
    onSubmitClick = () => {
        const user = this.username.value
        const pass = this.password.value
        this.props.onLoginClick(user, pass)
    }
    onErrorLogin = () => {
        if (this.props.error !== '') {
            return (
                <div>
                    <div className="alert alert-danger mt-4 text-center">
                        {this.props.error}
                    </div>
                </div>
            )
             } else {
            return null
        }
        
    }
    logout = () => {
        console.log("logout");
        
        this.props.Logout()
    }
    getProfile = async userid => {
      try {
        const res = await axios.get(
          `http://localhost:1995/users/profile/${userid}`
        );
        
  
        this.setState({
          data: res.data
        });
      } catch (e) {
        console.log(e);
      }
    };
    profilePicture = () => {
      if (this.state.data.user.avatar !== undefined) {
        return (
          <img
            src={this.state.data.photo}
            alt={this.state.data.user.username}
            key={new Date()}
            className="rounded-circle float-left"
          />
        );
      }
      return (
        <img
          src={image}
          alt="avatar"
          key={new Date()}
          className="rounded-circle float-left"
        />
      );
    };
  render() {
    const { username,role } = this.props.user;
    
    if (role === 1) {
      return (
        <div>
          {/* <Redirect to="/admin/dashboard" /> */}
          <nav className="navbar navbar-expand-md navbar-white bg-white mb-3">
            <div className="container">
              <Link className="navbar-brand" to="/">
                PETINDOTRAVEL
              </Link>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNav2"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="collapse navbar-collapse row"
                id="navbarNav2"
              >
                <ul className="navbar-nav col-12">
                  <li className="nav-item m-2 ml-auto">

                  </li>
                  <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link
                      className="nav-link"
                      to="/admin/dashboard"
                    >
                      <i className="fas fa-home fa-2x text-white" />
                    </Link>
                    
                  </li>
                  <li className="nav-item dropdown m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link
                      className="nav-link"
                      data-toggle="dropdown"
                      to="/"
                    >
                      <i className="fas fa-user fa-2x text-white" />
                    </Link>
                      <div className="dropdown-menu form-wrapper">
                      <div className="mx-auto card">
                        <div className="card-body">
                          <p className="lead text-center">Halo admin {username} !</p>
                          <button
                            className="btn btn-secondary btn-block mt-5"
                            onClick={this.logout}
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
      
    } else if(role === 2){
      if(this.state.data !== undefined){
      return (
        <div>
          <nav className="navbar navbar-expand-md navbar-primary bg-primary mb-3">
            <div className="container">
              <Link className="navbar-brand" to="/">
                PETINDOTRAVEL
              </Link>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNav2"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="collapse navbar-collapse row"
                id="navbarNav2"
              >
                <ul className="navbar-nav col-12">
                  <li className="nav-item m-2 ml-auto">
                    <form className="navbar-form form-inline">
                      <div className="input-group search-box">
                        <input
                          type="text"
                          id="search"
                          className="form-control"
                          placeholder="Search here..."
                        />
                        <span className="input-group-addon">
                          <i className="fas fa-search" />
                        </span>
                      </div>
                    </form>
                  </li>
                  <li className="nav-item dropdown m-1 mx-auto mx-lg-0 m-lg-2">
                    <i className="fas fa-user fa-2x text-secondary" />
                    <div className="dropdown-menu form-wrapper">
                      <div className="card">
                        <div className="d-flex justify-content-between card-header">
                          {this.profilePicture()}
                          <p
                            className="text-right font-weight-bold my-auto"
                            style={{ fontSize: 14 }}
                          >
                            Hai {username}!
                          </p>
                        </div>
                        <div className="card-body">
                          <Link to="/profile">
                            <p className="text-center text-dark">
                              Profile
                            </p>
                          </Link>
                          <Link to="/addresscontact">
                            <p className="text-center text-dark">
                              My Address
                            </p>
                          </Link>
                          <Link to="/">
                            <p className="text-center text-dark">
                              Orders
                            </p>
                          </Link>
                          <Link to="/">
                            <p className="text-center text-dark">
                              History Orders
                            </p>
                          </Link>
                          <Link to="/">
                            <p className="text-center text-dark">
                              Payment Confirmation
                            </p>
                          </Link>
                          <button
                            className="btn btn-light btn-block mt-5"
                            onClick={this.logout}
                          >
                            Logout{" "}
                            <i className="fas fa-sign-out-alt text-secondary" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link className="nav-a" to="/">
                      <i className="fas fa-heart fa-2x text-primary" />
                    </Link>
                  </li>
                  <li className="nav-item m-1 mx-auto mx-lg-0 m-lg-2">
                    <Link className="nav-a" to="/ShoppingCart">
                      <i className="fas fa-shopping-cart fa-2x text-primary" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
      }else{
        return(
          <h1>Loading</h1>
        )

      }
    }else{
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">
          <div className="navbar-brand">Pet Travel</div>
        </Link>
        <div className="navbar-nav ml-auto align-item-center">
          <Link className="nav-item nav-link" to="/checkorder">
            Cek Order
          </Link>
          <Link className="nav-item nav-link" to="/login">
            <span className="align-content-center">
              <i class="fas fa-user" />
            </span>
            <span className="ml-1 align-content-center">Login</span>
          </Link>
        </div>
      </nav>
        </div>
      );  
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth,error : state.auth.error, empty: state.auth.empty };
};

export default connect(
  mapStateToProps,
  { Logout, onLoginClick, afterTwoSeconds }
)(Header);
