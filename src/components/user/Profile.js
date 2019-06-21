import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../config/axios";
import cookies from "universal-cookie";
import {onEdit} from '../../actions'

import "../profile.css"
import image from "../../img/avatar2.jpg"
import swal from "sweetalert";

var moment = require('moment');

const cookie = new cookies();

class Profile extends Component {
    state = {
        profile: undefined,
        photo:image,
        edit: true,
        address: undefined,
        kodepos:[],
    provinsi: [],
    kabupaten: [],
    kecamatan: [],
    kelurahan: [],
    filterKodepos: []
    }
    componentDidMount() {
        const userid = cookie.get("idLogin")
        this.getProfile(userid)
        this.getUserAddress(userid)
        this.getKodepos();
        this.getProvinsi()
    }
    getProfile = async userid => {
        try {
            const res = await axios.get(
                `/users/profile/${userid}`
            );

            this.setState({
                profile: res.data
            });
        } catch (e) {
            console.log(e);
        }
    };
    getUserAddress = async userid => {
        try {
            const res = await axios.get(
                `/user/address/${userid}`
            );

            this.setState({
                address: res.data
            });
        } catch (e) {
            console.log(e);
        }

    }
    getKodepos = async () => {
        try {
          const res = await axios.get(`/kodepos`);
          this.setState({
            kodepos: res.data
          });
          
        } catch (e) {
          console.log(e);
        }
      };
      getProvinsi = async () => {
        try {
          const res = await axios.get(`/province`);
          this.setState({
            provinsi: res.data
          });
          
        } catch (e) {
          console.log(e);
        }
      };
      selectKodepos = () => {
        return this.state.filterKodepos.map(item => {
          return (
            <option key={item.id} value={item.id}>
              {item.kodepos}
            </option>
          );
        });
      };
      selectProvinsi = () => {
        return this.state.provinsi.map(item => {
          return (
            <option key={item.provinsi} value={item.provinsi}>
              {item.provinsi}
            </option>
          );
        });
      };
      selectKabupaten = () => {
        return this.state.kabupaten.map(item => {
          return (
            <option key={item.kabupaten} value={item.kabupaten}>
              {item.kabupaten}
            </option>
          );
        });
      };
      selectKecamatan = () => {
        return this.state.kecamatan.map(item => {
          return (
            <option key={item.kecamatan} value={item.kecamatan}>
              {item.kecamatan}
            </option>
          );
        });
      };
      selectKelurahan = () => {
        return this.state.kelurahan.map(item => {
          return (
            <option key={item.kelurahan} value={item.kelurahan}>
              {item.kelurahan}
            </option>
          );
        });
      };
      filterKodepos = async () => {
        const kelurahan = this.kelurahan.value;
        
        try {
          const res = await axios.get(`/kodepos/${kelurahan}`);
          this.setState({
            filterKodepos: res.data
          });
          
        } catch (e) {
          console.log(e);
        }
      };
      filterKabupaten = async () => {
        const provinsi = this.provinsi.value;
    
        try {
          const res = await axios.get(`/kabupaten/${provinsi}`);
          this.setState({
            kabupaten: res.data
          });
          
        } catch (e) {
          console.log(e);
        }
      };
      filterKecamatan = async () => {
        const kabupaten = this.kabupaten.value;
    
        try {
          const res = await axios.get(`/kecamatan/${kabupaten}`);
          this.setState({
            kecamatan: res.data
          });
          
        } catch (e) {
          console.log(e);
        }
      };
      filterKelurahan = async () => {
        const kecamatan = this.kecamatan.value;    
        try {
          const res = await axios.get(`/kelurahan/${kecamatan}`);
          console.log(res.data);
          this.setState({
            kelurahan: res.data
          });
          
        } catch (e) {
          console.log(e);
        }
      };
    saveEdit = async(id) => {
        const firstname = this.firstname.value;
        const lastname = this.lastname.value;
        const username = this.username.value;
        const address = this.address.value;
        const email = this.email.value;
        const birthday = this.birthday.value;
        const phone_number = this.phone_number.value
        await this.props.onEdit(
          id,
          firstname,
          lastname,
          username,
          birthday,
          address,
          email,
          phone_number
        );
        await this.getProfile(id);
        this.setState({ edit: !this.state.edit });
    }
    saveAddress = async id => {
        const kodepos = this.kodepos.value;
        await this.onEditAddress(
          id,kodepos
        );
        await this.getUserAddress(id);
        this.setState({ edit: !this.state.edit });
      };
      onEditAddress = async (id,kodepos_id) => {
          try{
            const res = await axios.patch(`/users/${id}`, {
              kodepos_id
            });
            console.log(res.data);
            
            swal({
                text:"Edit Profile Success",
                icon:"success"
              })
          } catch (e) {
            swal({
                text:"Edit Profile Failed",
                icon:"error"
              })
          }
      };
    postProfilePicture = async (userid) => {
        const formData = new FormData();
        const avatar = this.image.files[0];
    
        formData.append("avatar", avatar);
        try {
          const res = await axios.post(
            `http://localhost:1995/avatar/uploads/${userid}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }
          );
          this.getProfile(userid);
          swal({
              title:"Success",
              text:"Your profile picture has been updated",
              icon:"success"
          })
        } catch (e) {
          console.log("upload gagal" + e);
        }
      };
    handleChange = event =>{
        this.setState({photo : URL.createObjectURL(event.target.files[0])})
    }
    renderProfile = () => {
        const { username, firstname, lastname, age, id, email, address, birthday, phone_number } = this.state.profile[0];
        var birth = moment(birthday);
        var date = birth.utc().format("YYYY-MM-DD");

        if (this.state.edit) {
            return(
            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="row">
                    <div className="col-md-6">
                        <label>Firstname</label>
                    </div>
                    <div className="col-md-6">
                        <p> {firstname} </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Lastname</label>
                    </div>
                    <div className="col-md-6">
                        <p> {lastname} </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Email</label>
                    </div>
                    <div className="col-md-6">
                        <p> {email} </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Age</label>
                    </div>
                    <div className="col-md-6">
                        <p> {age} </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Birthday</label>
                    </div>
                    <div className="col-md-6">
                        <p> {date} </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Address</label>
                    </div>
                    <div className="col-md-6">
                        <p> {address} </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Phone Number</label>
                    </div>
                    <div className="col-md-6">
                        <p> {phone_number} </p>
                    </div>
                </div>
            </div>
            )
            
        }
        return (
            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="row">
                    <div className="col-md-6">
                        <label>Username</label>
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" type="text" defaultValue={username}  ref={input => {this.username = input}} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Firstname</label>
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" type="text" defaultValue={firstname}  ref={input => {this.firstname = input}} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Lastname</label>
                    </div>
                    <div className="col-md-6">
                    <input className="form-control" type="text" defaultValue={lastname}  ref={input => {this.lastname = input}} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Email</label>
                    </div>
                    <div className="col-md-6">
                    <input className="form-control" type="text" defaultValue={email}  ref={input => {this.email = input}} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Birthday</label>
                    </div>
                    <div className="col-md-6">
                    <input className="form-control" type="date" defaultValue={date}  ref={input => {this.birthday = input}} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Address</label>
                    </div>
                    <div className="col-md-6">
                    <input className="form-control" type="text" defaultValue={address}  ref={input => {this.address = input}} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Phone Number</label>
                    </div>
                    <div className="col-md-6">
                    <input className="form-control" type="text" defaultValue={phone_number}  ref={input => {this.phone_number = input}} />
                    </div>
                </div>
                <div className="row mt-1">
                <input type="submit" className="profile-edit-btn text-right" value="Save Profile" onClick={() => {this.saveEdit(id)}} />

                </div>
            </div>
        )
    }
    renderAddress = () => {
        const id = cookie.get('idLogin')
        if(this.state.address !== undefined && this.state.edit === true){
            if(this.state.address.length !== 0){
                const {kodepos,kelurahan,kecamatan,kabupaten,provinsi} = this.state.address[0]
                if(this.state.edit){
                    return(
                        <div className="tab-pane fade" id="address" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Provinsi</label>
                                </div>
                                <div className="col-md-6">
                                    <p> {provinsi} </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Kabupaten</label>
                                </div>
                                <div className="col-md-6">
                                    <p> {kabupaten} </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Kecamatan</label>
                                </div>
                                <div className="col-md-6">
                                    <p> {kecamatan} </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>kelurahan</label>
                                </div>
                                <div className="col-md-6">
                                    <p> {kelurahan} </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label> Kodepos </label>
                                </div>
                                <div className="col-md-6">
                                    <p> {kodepos} </p>
                                </div>
                            </div>
                        </div>
                    )
                }
                
            }else{
                console.log(this.state.edit);
                return (
                    <div className="tab-pane fade" id="address" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="row">
                            <div className="col-md-6">
                                <label>Provinsi</label>
                            </div>
                            <div className="col-md-6">
                                <p> Not set yet </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Kabupaten</label>
                            </div>
                            <div className="col-md-6">
                                <p> Not set yet  </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Kecamatan</label>
                            </div>
                            <div className="col-md-6">
                                <p> Not set yet  </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>kelurahan</label>
                            </div>
                            <div className="col-md-6">
                                <p> Not set yet  </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label> Kodepos </label>
                            </div>
                            <div className="col-md-6">
                                <p> Not set yet  </p>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        return (
            <div className="tab-pane fade" id="address" role="tabpanel" aria-labelledby="profile-tab">
                <div className="row">
                    <div className="col-md-6">
                        <label>Provinsi</label>
                    </div>
                    <div className="col-md-6">
                        <select type="text" className="form-control" ref={input => { this.provinsi = input }} onClick={this.filterKabupaten}>
                            {this.selectProvinsi()}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Kabupaten</label>
                    </div>
                    <div className="col-md-6">
                        <select type="text" className="form-control" ref={input => { this.kabupaten = input }} onClick={this.filterKecamatan}>
                            {this.selectKabupaten()}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Kecamatan</label>
                    </div>
                    <div className="col-md-6">
                        <select type="text" className="form-control" ref={input => { this.kecamatan = input }} onClick={this.filterKelurahan}>
                            {this.selectKecamatan()}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>kelurahan</label>
                    </div>
                    <div className="col-md-6">
                        <select type="text" className="form-control" ref={input => { this.kelurahan = input }} onClick={this.filterKodepos}>
                            {this.selectKelurahan()}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label> Kodepos </label>
                    </div>
                    <div className="col-md-6">
                        <select type="text" className="form-control" ref={input => { this.kodepos = input }}>
                            {this.selectKodepos()}
                        </select>
                    </div>
                </div>
                <div className="row mt-2">
                <input type="submit" className="profile-edit-btn text-right" value="Save Address" onClick={() => {this.saveAddress(id)}} />
                </div>
            </div>
        )
        


    }
    editProfile = () => {
        this.setState({edit:!this.state.edit})
    }
    profilePicture = () => {
        if(this.state.profile[0].avatar.includes("null")){
            return(
            <div className="profile-img">
                <img src={this.state.photo} alt={this.state.profile[0].avatar} />
                <div className="file btn btn-lg btn-primary">
                    Change Photo
                    <input type="file" name="file" ref={input=>{this.image = input}} onChange={this.handleChange} />
                </div>
            </div>
            )
            
        }
        return (
            <div className="profile-img">
                <img src={this.state.profile[0].avatar} alt={this.state.profile[0].avatar} />
                <div className="file btn btn-lg btn-primary">
                    Change Photo
                        <input type="file" name="file" ref={input => { this.image = input }} onChange={this.handleChange} />
                </div>
            </div>
        )
    }
    render() {
        const { username } = this.props.user
        if(this.state.profile !== undefined){
            return (
                <div className="container emp-profile">
                    {/* <form method="post"> */}
                    <div className="row">
                        <div className="col-md-4">
                            {this.profilePicture()}
                            <button className="profile-upload-btn text-right" onClick={() => {this.postProfilePicture(cookie.get("idLogin"))}}>Upload</button>
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="profile-head">
                                        <h5>
                                            {username}
                                        </h5>
    
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" onClick={this.editProfile} />
                                </div>
                            </div>
    
                            <div className="row">
                                <div className="col-md-12">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#address" role="tab" aria-controls="profile" aria-selected="false">Detail Address</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content profile-tab" id="myTabContent">
                                        {this.renderProfile()}
                                        {this.renderAddress()}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </form>            */}
                </div>
            )
        }else{
            return(
                <h1>Loading</h1>
            )
        }
    }
}
const mapStateToProps = state => {
    return { user: state.auth };
};
export default connect(
    mapStateToProps,
    {onEdit}
)(Profile);