import React, { Component } from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import cookies from 'universal-cookie'
import {connect} from 'react-redux'

import {keepLogin} from '../actions'

import Home from './user/Home'
import Header from './user/Header'
import ManageTravelPrice from './admin/ManageTravelPrice'
import ManageProductPrice from './admin/ManageProductPrice'
import ManageProduct from './admin/ManageProduct'
import ManageAuthorPublisher from './admin/ManageAuthorPublisher'
import ManageHomeImage from './admin/ManageHomeImage'
import LoginAdmin from './admin/LoginAdmin';
import DashboardAdmin from './admin/DashboardAdmin';
const cookie = new cookies()


class App extends Component {

    componentDidMount(){
        var userCookie = cookie.get("stillLogin");
        var idCookie = parseInt(cookie.get("idLogin"));
        var roleCookie = parseInt(cookie.get("role"));


        if (userCookie !== undefined || idCookie !== NaN || roleCookie !== NaN) {
            
            this.props.keepLogin(userCookie, idCookie,roleCookie);
        
        }
}

    render () {
        return (
        <BrowserRouter>
            <div>
                <Header/>
                <Route path="/" exact component={Home}/>
                <Route path="/manageproduct" component={ManageProduct}/>
                <Route path="/managetravel" component={ManageTravelPrice}/>
                <Route path="/manageproductprice" component={ManageProductPrice}/>
                <Route path="/manageauthorpublisher" component={ManageAuthorPublisher}/>
                <Route path="/managehomeimage" component={ManageHomeImage}/>
                <Route path="/admin/login" component={LoginAdmin}/>
                <Route path="/admin/dashboard" component={DashboardAdmin}/>
            </div>
        </BrowserRouter>
            
        )
    }
}




export default connect (null, {keepLogin})(App);