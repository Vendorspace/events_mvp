import React, { Component } from 'react';
import PropTypes  from "prop-types";
import { connect } from "react-redux";
import { getResults } from "../../actions/searchActions";



export class SearchResult extends Component {
  constructor() {
    super();
    this.state = {
      answer: ''
    };

    
  }
 
  componentWillMount(){
    
    console.log('will mount');
    console.log(this.props.search)
  }
  
  render() {

    


    

    return (
      <div>
        <h1>and the results are...</h1>
        
      </div>
    )
  }
}

SearchResult.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getResults: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  search: state.search
});


export default connect(mapStateToProps, { getResults })(SearchResult);
