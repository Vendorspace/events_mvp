import React, { Component } from "react";
import logo from "../../images/logo-no-tag.png";
import "../../CSS/navbar.css";

class Navbar extends Component {
	render() {
		return (
			<div>
				<nav className="navbar vs-nav-bar">
					<div className="container-fluid">
						<a className="navbar-brand vs-logo-container" href="#">
							<img className="vs-nav-logo" src={logo} />
						</a>
						<ul className="nav navbar-nav navbar-right">
							<li>
								<a href="#">How it works</a>
							</li>
							<li className="divider-vertical" />

							<li>
								<a href="#">Sign in</a>
							</li>

							<li>
								<a href="#">Register</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default Navbar;
