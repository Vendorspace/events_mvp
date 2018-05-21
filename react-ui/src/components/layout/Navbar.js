import React, { Component } from "react";
import logo from "../../images/logo-no-tag.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "../../CSS/navbar.css";

class Navbar extends Component {
	render() {
		return (
			<div>
				<nav className="vs-nav-bar navbar navbar-expand navbar-light bg-light d-flex justify-content-between">
					<a className="navbar-brand " href="#">
						<img className="vs-nav-logo" src={logo} />
					</a>
					<ul className="navbar-nav">
						<li className="p-2 ">How it works</li>
						<div className="p-2 divider-vertical" />
						<li className="p-2 ">
							<Link to="/login">Sign in</Link>
						</li>
						<li className="p-2 ">
							<Link to="/register">Register</Link>
						</li>
						<div className="p-2 divider-vertical" />
					</ul>
				</nav>
			</div>
		);
	}
}

export default Navbar;
