import React, {Component} from 'react';
import {connect} from "react-redux";

class Body extends Component {
  render() {

    return (
      <div>body</div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(
  mapStateToProps,
)(Body);
