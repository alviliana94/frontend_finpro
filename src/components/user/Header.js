import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import cookies from "universal-cookie";

import { Logout } from "../../actions";
import {login} from '../../actions'
import image from '../../img/avatar2.jpg'

const cookie = new cookies();

class Header extends Component {
  state = {
    data: undefined
  };
  componentDidMount() {

  }
    onSubmitClick = () => {
        const user = this.username.value
        const pass = this.password.value
        this.props.login(user, pass)
    }
    logout = () => {
        console.log("logout");
        
        this.props.Logout()
    }
    
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
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">
          <div className="navbar-brand">PetTravel</div>
        </Link>
        <div className="navbar-nav ml-auto align-item-center">
          <Link className="nav-item nav-link" to="/checkorder">
            Cek Order
          </Link>
          <Link className="nav-item nav-link" to="/profile">
            <span className="align-content-center">
              <i class="fas fa-user" />
              {" "} Hai {username} !
            </span>
          </Link>
        </div>
      </nav>
        </div>
      );
    }else{
      return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/">
          <div className="navbar-brand">PetTravel</div>
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
  { Logout, login}
)(Header);
