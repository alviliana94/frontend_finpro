import React, { Component } from "react";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from "axios";
import cookies from "universal-cookie";
import { onEdit } from '../../actions'


import Sidebar from "./Sidebar";
import "../style.css";

const cookie = new cookies();

var moment = require('moment');



class DashboardAdmin extends Component {
  state = {
    edit: true,
    data:undefined
  };
  saveProfile = async id => {
    const firstname = this.firstname.value;
    const lastname = this.lastname.value;
    const username = this.username.value;
    const address = this.address.value;
    const email = this.email.value;
    const birthday = this.birthday.value;
    await this.props.onEdit(id,firstname, lastname, username,birthday,address,email);
    await this.getProfile(id)
    this.setState({ edit: !this.state.edit });
  };
  uploadAvatar = async (userid) => {
    const formData = new FormData();
    var imagefile = this.gambar;

    formData.append("avatar", imagefile.files[0]);
    try {
      await axios.post(`http://localhost:2000/avatar/uploads/${userid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      this.getProfile(userid)
    } catch (e) {
      console.log("upload gagal"+e);
    }
  };

  componentDidMount() {
    const userid = cookie.get('idLogin')
    this.getProfile(userid);
}
  getProfile = async (userid) => {        
    
    try {
        const res = await axios.get(`http://localhost:1995/users/profile/${userid}`);
        
        this.setState({
          data: res.data
        });
        
    } catch (e) {
      console.log(e);
      
    }
};
  profile = () => {

    const { username, firstname, lastname, age, id , email,address,birthday} = this.state.data.user;
    var birth = moment(birthday)
    var date = birth.utc().format('YYYY-MM-DD')
    
    if (this.state.edit) {
      return (
        <div>
          {/* <div class="card-header">
          <p class="lead text-center"> User's Information</p>
          </div> */}
          <li class="list-group-item pl-0">{`Firstname: ${firstname}`}</li>
          <li class="list-group-item pl-0">{`Lastname: ${lastname}`}</li>
          <li class="list-group-item pl-0">{`Username: ${username}`}</li>
          <li class="list-group-item pl-0">{`Age: ${age}`}</li>
          <li class="list-group-item pl-0">{`Address: ${address}`}</li>
          <li class="list-group-item pl-0">{`Email: ${email}`}</li>
          
        </div>
      );
    }
    return (
      <div>
        <li class="list-group-item pl-0">
          <input
            type="text"
            class="form-control"
            ref={input => {
              this.firstname = input;
            }}
            defaultValue={firstname}
          />
        </li>
        <li class="list-group-item pl-0">
          <input
            type="text"
            class="form-control"
            ref={input => {
              this.lastname = input;
            }}
            defaultValue={lastname}
          />
        </li>
        <li class="list-group-item pl-0">
          <input
            type="text"
            class="form-control"
            ref={input => {
              this.username = input;
            }}
            defaultValue={username}
          />
        </li>
        <li class="list-group-item pl-0">
          <input
            type="date"
            class="form-control"
            ref={input => {
              this.birthday = input;
            }}
            defaultValue={date}
          />
        </li>
        <li class="list-group-item pl-0">
          <input
            type="text"
            class="form-control"
            ref={input => {
              this.address = input;
            }}
            defaultValue={address}
          />
        </li>
        <li class="list-group-item pl-0">
          <input
            type="text"
            class="form-control"
            ref={input => {
              this.email = input;
            }}
            defaultValue={email}
          />
        </li>
        <li class="list-group-item px-0">
          <div class="d-flex justify-content-center">
            <button
              onClick={() => {
                this.saveProfile(id);
              }}
              className="btn btn-outline-primary"
            >
              save
            </button>
          </div>
        </li>
        <li class="list-group-item px-0">
          <div class="d-flex justify-content-center">
            <button
              onClick={() => {
                this.setState({edit: !this.state.edit});
              }}
              className="btn btn-outline-danger"
            >
              cancel
            </button>
          </div>
        </li>
      </div>
    );
  };
  render() {
    if(cookie.get('stillLogin')){
      if(this.state.data !== undefined){
        return (
          <div id="App">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
            <div id="page-wrap">
              <div className="container">
                  <div class="card">
                    <div class="card-header bg-warning" >
                      <p class="lead text-center">Admin's Information</p>
                    </div>
                    <div class="card-body">
                  <div class="row">
                  <div class="col-md-8 col-sm-12">
                  <ul class="list-group mt-3">{this.profile()}</ul>
                  </div>
                    <div class="col-md-4 col-sm-12">
                    <img
                      src={this.state.data.photo} alt={this.state.data.user.username} key={new Date()} className="card-img-top rounded-circle img-thumbnail"
                    />
                      <div className="custom-file">
                        <input
                          type="file"
                          id="myfile"
                          ref={input => (this.gambar = input)}
                          className="custom-file-input"
                        />
                        <label className="custom-file-label" for="myfile">choose your file here . . . . . . . . . . . . . . .</label>
                      </div>
                      <div class="d-flex justify-content-between py-2">
                        <p></p>
                        <button className="btn btn-primary" onClick={() => this.uploadAvatar(this.props.user.id)}>
                          Upload
                        </button>
                      </div>
                    </div>
                
                </div>
                </div>
                <div class="card-footer bg-warning">
            <div class="d-flex justify-content-between">
              <button
                onClick={() => {
                  this.setState({ edit: !this.state.edit });
                }}
                className="btn btn-outline-primary"
              >
                Edit Profile
              </button>
            </div>
          </div>
              </div>
            </div>
            </div>
          </div>
        );
  
      }else{
        return(
          <h1>Loading</h1>
          )
        }
        
      }else{
      return <Redirect to="/admin/login" />
      }
    
    
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(
  mapStateToProps,
  {onEdit}
)(DashboardAdmin);
