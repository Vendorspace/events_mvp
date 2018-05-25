import React, { Component } from "react";
import logo from "../../images/logo-no-tag.png";
import "../../CSS/footer.css";
import { footer } from "reactstrap";

class Footer extends Component {
	render() {
		return (
			<div>
				<footer className="footer">
					<div className="container container-clear-top">
						<span className="width-50">
							(C) 2017 Vendorspace llc., All rights reserved
						</span>
					</div>
				</footer>
			</div>
		);
	}
}

export default Footer;
