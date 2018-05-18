import React, { Component } from "react";
import logo from "../../images/logo-no-tag.png";
import { Link } from "react-router-dom";
import "../../CSS/navbar.css";

class Navbar extends Component {
	render() {
		return (
			<div>
				<nav className="navbar vs-nav-bar">
					<div className="container-fluid">
						<Link className="navbar-brand vs-logo-container" to="/">
							<img className="vs-nav-logo" src={logo} />
						</Link>
						<ul className="nav navbar-nav navbar-right">
							<li>
								<a href="#">How it works</a>
							</li>
							<li className="divider-vertical" />

							<li>
								<Link to="/login">Sign in</Link>
							</li>

							<li>
								<Link to="/register">Register</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default Navbar;
