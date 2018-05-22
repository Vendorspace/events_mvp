import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	render() {
		return <div>This is the landing</div>;
	}
}

Landing.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Landing);
