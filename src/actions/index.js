import axios from "../config/axios";
import cookies from "universal-cookie";

const cookie = new cookies();

export const onLoginClick = (username, password) => {
  return async dispatch => {
    await axios
      .post("/users/login", {
        username,
        password
      })
      .then(
        res => {
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
          dispatch({
            type: "AUTH_ERROR",
            payload: "Username or Password incorrect"
          });
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

export const onRegister = (firstname,lastname,username,email,password,birthday,address,kodepos) => {
  return dispatch => {
    if (firstname === "" || lastname === "" || username === "" || password === "" || email === "") {
      dispatch({
        type: "AUTH_EMPTY",
        payload: "* this form cannot be empty"
      });
    }else{
      axios.post("/user/register", {
        firstname,lastname,username,email,password,birthday,address,kodepos
        })
        .then(res => {
          console.log("Register Success");
          dispatch({
            type: "REGISTER_SUCCESS",
            payload: `Register Success, please check your email to activate your account!`
          });
        },err => {
          console.log(err);
            dispatch({
              type: "AUTH_ERROR",
              payload:"REgister Failed"
            });
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

export const onEdit = (id,firstname, lastname, username,birthday,address,email) => {
  return async dispatch => {
    try {
      const res = await axios.patch(`http://localhost:2000/users/${id}`, {
        firstname, lastname, username,birthday,address,email
      });
      console.log(res.data[0].id);
      
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

// export const addProduct = (name, desc, price, pict) => {
//   return dispatch => {
//     axios
//       .post("/product", {
//         name: name,
//         desc: desc,
//         price: price,
//         pict: pict
//       })
//       .then(res => {
//         console.log("berhasil menambahkan");
//         const { name, desc, price, pict } = res.data[0];
//         dispatch({
//           type: "ADD_SUCCESS",
//           payload: { name, desc, price, pict }
//         });
//       });
//   };
// };
