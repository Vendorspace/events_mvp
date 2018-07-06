import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";




class SearchContainer extends Component {
	

	render() {

		

		return (
			<div>
				
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

export default SearchContainer