import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getSearchResults } from "../../actions/searchActions";

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      query: ""
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

  render() {
    return (
      <div className=" mt-5 pb-5 searchbox">
        <form class="form-inline justify-content-center">
          <div class="input-group mt-5 mb-2 mr-sm-2 mb-sm-0">
            <input
              type="text"
              class="form-control"
              id="lookingfor"
              placeholder="Looking for..."
            />
            <div class="form-group col-md-4">
              <select id="inputState" class="form-control">
                <option selected>Business Type</option>
                <option>Vendor</option>
                <option>Planner</option>
                <option>Supplier</option>
              </select>
            </div>
          </div>
        </form>
        <div className="mt-5 ">
          <button
            id="searchbutton"
            type="button"
            class=" btn btn-warning p-2 mb-5  btn-primary my-2 my-sm-0"
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
