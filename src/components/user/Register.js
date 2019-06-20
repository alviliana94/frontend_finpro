import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../actions'

class Register extends Component {

    onRegister = () => {
        const firstname = this.firstname.value
        const lastname = this.lastname.value
        const email = this.email.value
        const password = this.password.value
        const username = this.username.value
        const birthday = this.birthday.value

        this.props.register(firstname,lastname,username,email,password,birthday)
    }



    render(){
        var d = new Date()
        // if(this.props.username ===""){
            return(
                <div className="mt-5 row">
                    <div className="col-sm-3 col-md-6 mx-auto card">
                        <div className="card-body">
                            <div className="border-bottom border-secondary card-title">
                                <h1>Register</h1>
                            </div>
                            <div className="card-title mt-1">
                                <h4>Firstname</h4>
                            </div>
                            <form className="input-group">
                                <input ref={input => { this.firstname = input }} className="form-control" type="text" />
                            </form>
                            <div className="card-title mt-1">
                                <h4>Lastname</h4>
                            </div>
                            <form className="input-group">
                                <input ref={input => { this.lastname = input }} className="form-control" type="text" />
                            </form>
                            <div className="card-title mt-1">
                                <h4>Email</h4>
                            </div>
                            <form className="input-group">
                                <input ref={input => { this.email = input }} className="form-control" type="text" />
                            </form>
                            <div className="card-title mt-1">
                                <h4>username</h4>
                            </div>
                            <form className="input-group">
                                <input ref={input => { this.username = input }} className="form-control" type="text" />
                            </form>
                            <div className="card-title mt-1">
                                <h4>Password</h4>
                            </div>
                            <form className="input-group">
                                <input ref={input => { this.password = input }} className="form-control" type="password" />
                            </form>
                            <div className="card-title mt-1">
                                <h4>Birthday</h4>
                            </div>
                            <form className="input-group">
                                <input ref={input => { this.birthday = input }} className="form-control" type="date" max={d.toISOString().split('T')[0]} />
                            </form>
                            
                            <button className="btn btn-success btn-block mt-5" onClick={this.onRegister}>Register</button>

                            <p className="lead">Already have account ? <Link to="/Login">Sign In!</Link></p>
                        </div>
                    </div>
                </div>
            )
        // } else {
        //     return (<Redirect to="/" />)
        // }
    }  
}

const mapStateToProps = state =>{
    return {
        username: state.auth.username,
        error: state.auth.error,
        success: state.auth.success
    }
}

export default connect (mapStateToProps,{register})(Register)
