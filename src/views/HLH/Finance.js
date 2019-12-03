import React, {Component} from "react";
import {connect} from "react-redux";
import * as roles from "../../shared/roles";

// import * as actions from "../../store/actions";

class Finance extends Component {
  render() {
    // const {isAdmin} = this.props;
    // if (isAdmin)
    return (<div>
      This is a stub
    </div>);
    // else{
    //
    // }
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.auth.user.role === roles.ADMIN,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Finance);
