import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../config/axios";
import cookies from "universal-cookie";

import "../profile.css"
import image from "../../img/avatar2.jpg"

var moment = require('moment');

const cookie = new cookies();

class Profile extends Component {

    state = {
        profile: undefined,
        photo:image,
        edit: true
    }
    componentDidMount() {
        const userid = cookie.get("idLogin")
        this.getProfile(userid)

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

    handleChange = event =>{
        this.setState({photo : URL.createObjectURL(event.target.files[0])})
    }

    renderProfile = () => {
        const { username, firstname, lastname, age, id, email, address, birthday } = this.state.profile[0];
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
                        <label>Address</label>
                    </div>
                    <div className="col-md-6">
                        <p> {address} </p>
                    </div>
                </div>
            </div>
            )

        }
    }

    profilePicture = () => {
        if(this.state.profile[0].avatar.includes("null")){
            return(
            <div className="profile-img">
                <img src={this.state.photo} alt={this.state.profile[0].avatar} />
                <div className="file btn btn-lg btn-primary">
                    Change Photo
                    <input type="file" name="file" onChange={this.handleChange} />
                </div>
            </div>
            )

        }
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
                                    <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                                </div>
                            </div>
    
                            <div className="row">
                                <div className="col-md-12">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content profile-tab" id="myTabContent">
                                        {this.renderProfile()}
                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Experience</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>Expert</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Hourly Rate</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>10$/hr</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Total Projects</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>230</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>English Level</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>Expert</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Availability</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>6 months</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label>Your Bio</label><br />
                                                    <p>Your detail description</p>
                                                </div>
                                            </div>
                                        </div>
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
)(Profile);