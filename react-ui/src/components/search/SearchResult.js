import React, { Component } from 'react';
import PropTypes  from "prop-types";
import { connect } from "react-redux";
import { getResults } from "../../actions/searchActions";



export class SearchResult extends Component {
  
 
  
  
  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <h1>and the results are...</h1>
        {this.props.search.toString()}
      </div>
    )
  }
}

SearchResult.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  search: state.search
});


export default connect(mapStateToProps)(SearchResult);
