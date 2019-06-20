import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import cookies from "universal-cookie";

import {login} from '../../actions'

const cookie = new cookies();


class Login extends Component {
  onLogin = () => {
    const user = this.username.value;
    const pass = this.password.value;
    this.props.login(user, pass);
  };
  
  
  render() {
    const {role} = this.props.user

    if(role !== 2) {
          return (
              <div className="mt-5 row">
              <div className="col-sm-6 col-md-3 mx-auto card">
                <div className="card-body">
                  <div className="border-bottom border-secondary card-title">
                    <h1>Login</h1>
                  </div>
                  <div className="card-title mt-1">
                    <h4>Username or Email</h4>
                  </div>
                  <form className="input-group">
                    <input
                      ref={input => {
                          this.username = input;
                      }}
                      className="form-control"
                      type="text"
                      />
                  </form>
                  <div className="card-title mt-1">
                    <h4>Password</h4>
                  </div>
                  <form className="input-group">
                    <input
                      ref={input => {
                          this.password = input;
                        }}
                        className="form-control"
                        type="password"
                        />
                  </form>
                  <button
                    className="btn btn-success btn-block mt-5"
                    onClick={this.onLogin}
                    >
                    Login
                  </button>
                  <p className="lead">
                    Don't have account ? <Link to="/register">Sign Up!</Link>
                  </p>
                </div>
              </div>
            </div>
          );
        }else{
            console.log(role);
          return <Redirect to="/" />;
        }
        
        
    }
}

const mapStateToProps = state => {
    return {error : state.auth.error, empty: state.auth.empty,  user:state.auth}
}

export default connect(mapStateToProps,{login})(Login)