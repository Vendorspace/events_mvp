import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from '../common/TextFieldGroup'

export class Login extends Component {
	constructor() {
		super();
		this.state = {
			contact_email: "",
			password: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
			//direct to profile if first time logging in
			//direct to search if profile is complete?
		}

		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			contact_email: this.state.contact_email,
			password: this.state.password
		};

		this.props.loginUser(userData);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;

		return (
			<div>
				<div className="login">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								<h1 className="display-4 text-center">
									Log In
								</h1>
								<p className="lead text-center">
									Sign in to your Vendorspace account
								</p>
								<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									placeholder="Email Address"
									name="contact_email"
									value={this.state.contact_email}
									onChange={this.onChange}
									error={errors.contact_email}
								/>
								<TextFieldGroup
									placeholder="password"
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.onChange}
									error={errors.password}
								/>

									
									<input
										type="submit"
										className="btn btn-info btn-block mt-4"
									/>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
