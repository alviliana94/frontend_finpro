import React from "react";
import { Link, Redirect } from 'react-router-dom'
import { slide as Menu } from "react-burger-menu";

export default props => {
  return (
    // Pass on our props
    <Menu {...props}>
      <Link className="menu-item" to="/managetravel">
        Manage Travel Price
      </Link>
      <Link className="menu-item" to="/manageproductprice">
        Manage Product Price
      </Link>
      <Link className="menu-item" to="/manageproduct">
        Manage Product
      </Link>
      <Link className="menu-item" to="/manageauthorpublisher">
        Manage Author & Publisher
      </Link>
      <Link className="menu-item" to="/managehomeimage">
        Manage Image Home
      </Link>
      <a className="menu-item" href="/">
        Manage Payment History
      </a>
    </Menu>
  );
};