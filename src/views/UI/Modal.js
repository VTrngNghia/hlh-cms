import React, {Component} from "react";
import Auxi from "./Auxi";
import Backdrop from "./Backdrop";

import classes from "./Modal.module.css";

class Modal extends Component {
  
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }
  
  render() {
    return (
      <Auxi>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-700vh)",
            opacity  : this.props.show ? "1" : "0",
          }}>
          {this.props.children}
        </div>
      </Auxi>
    );
  }
}

export default Modal;
