import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      bizName: "",
      contact_email: "",
      userType: "",
      owner: "",
      contact_phone: "",
      avatar: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      bizName: this.state.bizName,
      contact_email: this.state.contact_email,
      contact_phone: this.state.contact_phone,
      userType: this.state.userType,
      owner: this.state.owner,
      avatar: this.state.avatar,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    console.log(errors);

    return (
      <div>
        <div className="register control-label">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your Vendorspace account
                </p>
                {Object.keys(errors).length != 0 && (
                  <div className="alert alert-danger" role="alert">
                    {" "}
                    Please fill in the required fields.
                  </div>
                )}
                <form onSubmit={this.onSubmit}>
				<TextFieldGroup
                      placeholder="Business Name"
                      name="bizName"
                      value={this.state.bizName}
                      onChange={this.onChange}
                      error={errors.bizName}
                    />

					
                  <div className="form-group">
                    <select
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.userType
                      })}
                      placeholder="Business Type"
                      name="userType"
                      value={this.state.userType}
                      onChange={this.onChange}
                    >
                      <option> </option>
                      <option>Vendor</option>
                      <option>Planner</option>
                      <option>Supplier</option>
                    </select>
                    {errors.userType && (
                      <div className="invalid-feedback">{errors.userType}</div>
                    )}
                  </div>
					
				  <TextFieldGroup
                      placeholder="Owner"
                      name="owner"
                      value={this.state.owner}
                      onChange={this.onChange}
                      error={errors.owner}
                    />
                  
				  <TextFieldGroup
                      placeholder="Contact Phone"
                      name="contact_phone"
                      value={this.state.contact_phone}
                      onChange={this.onChange}
                      error={errors.contact_phone}
                    />
                   <TextFieldGroup
                      placeholder="Email Address"
					  name="contact_email"
					  type="email"
                      value={this.state.contact_email}
                      onChange={this.onChange}
                      error={errors.contact_email}
                    />
                   <TextFieldGroup
                      placeholder="Password"
					  name="password"
					  type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                   <TextFieldGroup
					  placeholder="Confirm Password"
					  type="password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.onChange}
                      error={errors.password2}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
