import React, { Component } from "react";
import logo from "../../images/logo-no-tag.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "../../CSS/navbar.css";

class Navbar extends Component {
	onLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser();
	}

	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<ul className="navbar-nav">
				<li className="p-2 ">How it works</li>
				<div className="p-2 divider-vertical" />
				<li className="p-2 ">
					<a
						href="#"
						onClick={this.onLogoutClick.bind(this)}
						className="p-2"
					>
						<img
							src={user.avatar}
							alt={user.name}
							style={{ width: "25px", marginRight: "5px" }}
						/>
						Log Out
					</a>
				</li>
				<div className="p-2 divider-vertical" />
			</ul>
		);

		const guestLinks = (
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
		);

		return (
			<div>
				<nav className="vs-nav-bar navbar navbar-expand navbar-light bg-light d-flex justify-content-between">
					<Link className="navbar-brand " to="/">
						<img className="vs-nav-logo" src={logo} />
					</Link>
					{isAuthenticated ? authLinks : guestLinks}
				</nav>
			</div>
		);
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
