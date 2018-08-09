import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import "../../CSS/landing.css";
import { Link } from "react-router-dom";

export default class SearchBar extends Component {
  render() {
    return (
      <div className=" mt-5 pb-5 searchbox">
        <form className="form-inline justify-content-center">
          <div className="input-group mt-5 mb-2 mr-sm-2 mb-sm-0">
            <input
              type="text"
              className="form-control"
              id="lookingfor"
              placeholder="Looking for..."
            />
            <div className="form-group col-md-4">
              <select id="inputState" className="form-control">
                <option selected>Business Type</option>
                <option>Vendor</option>
                <option>Planner</option>
                <option>Supplier</option>
              </select>
            </div>
          </div>
        </form>
        <div className="mt-5 ">
          <Link
            to="/searchResult"
            id="searchbutton"
            type="button"
            className=" btn btn-warning p-2 mb-5  btn-primary my-2 my-sm-0"
          >
            Search
          </Link>
        </div>
      </div>
    );
  }
}


