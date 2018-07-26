import React, { Component } from 'react'

class SearchBar extends Component {
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

    )
  }
}

export default SearchBar;
