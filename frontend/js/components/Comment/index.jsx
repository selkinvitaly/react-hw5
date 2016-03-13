"use strict";

import React, { Component, PropTypes } from "react";

class Comment extends Component {

  render() {
    return <li>{this.props.comment.user + ": " + this.props.comment.text}</li>;
  }

}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default Comment;
