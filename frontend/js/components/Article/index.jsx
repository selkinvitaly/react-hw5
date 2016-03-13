"use strict";

import React, { Component, PropTypes } from "react";
import CommentList from "../CommentList";
import * as actions from "../../actions/articles";

class Article extends Component {

  selectHandler() {
    return e => {
      e.preventDefault();
      this.props.selectHandler();
    };
  }

  deleteHandler() {
    return e => {
      e.preventDefault();
      this.props.resetHandler();
      actions.deleteArticle(this.props.article.id);
    };
  }

  fetchArticle(article) {
    if (article.text) {
      return;
    }

    actions.getArticle(article.id);
  }

  getTitle() {
    const style = this.props.selected ? { color: "brown" } : null;

    return <h2 style={style}>
      {this.props.article.title}
    </h2>
  }

  getComments() {
    return <CommentList articleId={this.props.article.id} comments={this.props.article.comments || []} />;
  }

  getText() {
    const text = this.props.article.text || "text is loading...";

    if (!this.props.article.text) {
      this.fetchArticle(this.props.article);
    }

    return <p>{text}</p>;
  }

  getBody() {
    return <div>
      <p><a href="#" onClick={this.deleteHandler()}>delete article</a></p>
      <p><a href="#" onClick={this.selectHandler()}>select article</a></p>
      {this.getText()}
      {this.getComments()}
    </div>
  }

  render() {
    return this.props.article
    ? <div>
      {this.getTitle()}
      {this.getBody()}
    </div>
    : <p>Please, select an article</p>;
  }

}

Article.propTypes = {
  article: PropTypes.object,
  selectHandler: PropTypes.func,
  resetHandler: PropTypes.func.isRequired,
  selected: PropTypes.bool
};

export default Article;
