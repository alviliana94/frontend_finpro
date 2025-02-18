import axios from "../config/axios"; // untuk API
import cookies from "universal-cookie";
import swal from 'sweetalert';

const cookie = new cookies();

export const login = (username, password) => {
  return async dispatch => { // 
    await axios
      .post("/users/login", {
        username,
        password
      })
      .then(
        res => {
          console.log(res.data);
          
          cookie.set("idLogin", res.data.id, { path: "/" });
          cookie.set("stillLogin", res.data.username, { path: "/" });
          cookie.set("role", res.data.role, { path: "/" });

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              id: res.data.id,
              username: res.data.username,
              role: res.data.role
            }
          });
        },
        err => {
          console.log(err);
          swal({
            title:"Login Failed",
            text:"Username or Password incorrect",
            icon:"error"
          })
        }
      );
  };
};
export const onLoginAdmin = (username, password) => {
  return async dispatch => {
    await axios
      .post("/admin/login", {
        username,
        password
      })
      .then(
        res => {
          cookie.set("stillLogin", res.data.username, { path: "/" });
          cookie.set("idLogin", res.data.id, { path: "/" });
          cookie.set("role", res.data.role, { path: "/" });

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              id: res.data.id,
              username: res.data.username,
              role: res.data.role
            }
          });
        },
        err => {
          console.log(err);
          dispatch({
            type: "AUTH_ERROR",
            payload: "Username or Password incorrect"
          });
        }
      );
  };
};

export const register = (firstname,lastname,username,email,password,birthday,address,kodepos) => {
  return dispatch => {
    if (firstname === "" || lastname === "" || username === "" || password === "" || email === "") {
      return (
        swal({
          title:"Warning",
          text:"Field Cannot be empty!",
          icon:"warning"
        })
      )
    }else{
      axios.post("/user/register", {
        firstname,lastname,username,email,password,birthday,address,kodepos
        })
        .then(res => {
          console.log("Register Success");
          return(
            swal({
              title:"Register Succes",
              text:"Your account has been successfully registered, please check your email to activate your account",
              icon:"success"
            })
          )
        },err => {
          console.log(err);
          return(
            swal({
              title:"Register Failed",
              text:"",
              icon:"error"
            })
          )
      })
    }
  };
};
export const afterError = () => {
  return {
    type: "AFTER_ERROR"
  };
};
export const afterTwoSeconds = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(afterError());
    }, 3000);
  };
};
export const Logout = () => {
  cookie.remove("idLogin");
  cookie.remove("stillLogin");
  cookie.remove("role");

  return {
    type: "LOGOUT_USER"
  };
};
export const keepLogin = (username, id, role) => {
  return dispatch => {
    if (username === undefined || id === undefined || role === undefined) {
      dispatch({
        type: "KEEP_LOGIN",
        payload: {
          id: "",
          username: "",
          role: ""
        }
      });
    }
    dispatch({
      type: "KEEP_LOGIN",
      payload: {
        id,
        username,
        role
      }
    });
  };
};

export const onEdit = (id,firstname, lastname, username,birthday,address,email,phone_number) => {
  return async dispatch => {
    try {
      const res = await axios.patch(`/users/${id}`, {
        firstname, lastname, username,birthday,address,email,phone_number
      });
      swal({
        text:"Edit Profile Success",
        icon:"success"
      })
      
      cookie.set("stillLogin", res.data[0].username, { path: "/" });
      dispatch({
        type: "EDIT_SUCCESS",
        payload: {
          id: res.data[0].id,
          username: res.data[0].username,
          role: res.data[0].role
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
};


