import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import "../../CSS/landing.css";
import SearchBar from '../search/SearchBar';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        {" "}
        <div class="jumbotron">
          <div class="container text-center">
            <h4 class="display-4 ">Your next event starts here.</h4>
            <SearchBar />
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <h2>Heading</h2>
              <p>
                Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                fermentum massa justo sit amet risus. Etiam porta sem malesuada
                magna mollis euismod. Donec sed odio dui.{" "}
              </p>
              <p>
                <a class="btn btn-secondary" href="#" role="button">
                  View details &raquo;
                </a>
              </p>
            </div>
            <div class="col-md-4">
              <h2>Heading</h2>
              <p>
                Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
                tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                fermentum massa justo sit amet risus. Etiam porta sem malesuada
                magna mollis euismod. Donec sed odio dui.{" "}
              </p>
              <p>
                <a class="btn btn-secondary" href="#" role="button">
                  View details &raquo;
                </a>
              </p>
            </div>
            <div class="col-md-4">
              <h2>Heading</h2>
              <p>
                Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
                egestas eget quam. Vestibulum id ligula porta felis euismod
                semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris
                condimentum nibh, ut fermentum massa justo sit amet risus.
              </p>
              <p>
                <a class="btn btn-secondary" href="#" role="button">
                  View details &raquo;
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
