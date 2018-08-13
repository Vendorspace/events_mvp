import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import "../../CSS/landing.css";
import { Link } from "react-router-dom";
import { getResults } from "../../actions/searchActions";
import { withRouter } from "react-router-dom";

export class SearchBar extends Component {
  constructor() {
		super();
		this.state = {
      query: "",
      userType: ""
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(e) {
		e.preventDefault();
    console.log('submit clicked');
		const queryData = {
      query: this.state.query,
      userType: this.state.userType
		};

    this.props.getResults(queryData);
    this.props.history.push("/searchResult");
  }
  
  onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
  
  render() {
    return (
      <div className=" mt-5 pb-5 searchbox">
        <form onSubmit={this.onSubmit} className="form-inline justify-content-center">
          <div className="input-group mt-5 mb-2 mr-sm-2 mb-sm-0">
            <input
              value={this.state.query}
              onChange={this.onChange}
              type="text"
              name="query"
              className="form-control"
              id="lookingfor"
              placeholder="Looking for..."
            />
            <div className="form-group col-md-4">
              <select id="inputState" className="form-control" name="userType" value={this.state.userType} onChange={this.onChange}>
                <option selected>Business Type</option>
                <option>Vendor</option>
                <option>Planner</option>
                <option>Supplier</option>
              </select>
            </div>
          </div>
          <div className="mt-5 ">
          <button

            id="searchbutton"
            type="submit"
            className=" btn btn-warning p-2 mb-5  btn-primary my-2 my-sm-0"
          >
            Search
          </button>
        </div>
        </form>
        
      </div>
    );
  }
}


SearchBar.propTypes = {
  getResults: PropTypes.func.isRequired,
  
};

const mapStateToProps = state => ({
	search: state.search
});

export default connect(mapStateToProps, { getResults })(withRouter(SearchBar));