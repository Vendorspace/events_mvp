import React, { Component } from 'react';
import { PropTypes } from "prop-types";
import { connect } from "react-redux";


export class SearchResult extends Component {
  
  
  
  
  render() {
    return (
      <div>
        {this.props.search.results}
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
