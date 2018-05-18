import React, { Component } from "react";
import logo from "../../images/logo-no-tag.png";
import "../../CSS/footer.css";

class Footer extends Component {
	render() {
		return (
			<div>
				<div className="footer navbar-fixed-bottom">
					<div className="container">
						<div className="width-50">
							(C) 2017 Vendorspace llc., All rights reserved
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
