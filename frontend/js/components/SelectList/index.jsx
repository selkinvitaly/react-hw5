"use strict";

import React, { Component, PropTypes } from "react";
import Article from "../Article/";
import Select from "react-select";
import { articlesStore } from "../../stores/";

class SelectList extends Component {

  constructor() {
    super();
    this.state = {
      selected: {},
      current: null
    };
  }

  selectHandler(id) {
    return e => {
      this.selectArticle(id);
    };
  }

  selectArticle(id) {
    let newState = Object.assign({}, this.state);

    newState.selected[id] = !newState.selected[id];
    this.setState(newState);
  }

  chooseHandler(nextValue) {
    this.setState({
      current: nextValue
    });
  }

  resetSelect() {
    this.setState({
      current: null
    });
  }

  getOptions() {
    return this.props.articles.map(article => {
      return { value: article.id, label: article.title };
    });
  }

  getSelectList() {
    return <Select
     name="noname"
     options={this.getOptions()}
     searchable={false}
     value={this.state.current}
     onChange={this.chooseHandler.bind(this)}
   />;
  }

  getCurrentArticle() {
    let article = this.props.articles.filter(article => {
      return article.id === (this.state.current && this.state.current.value);
    })[0];

    return <Article
      article={article}
      resetHandler={this.resetSelect.bind(this)}
      selectHandler={article && this.selectHandler(article.id)}
      selected={article && !!this.state.selected[article.id]}
    />;
  }

  render() {
    return <div>
      {this.getSelectList()}
      {this.getCurrentArticle()}
    </div>;
  }

}

SelectList.propTypes = {
  articles: PropTypes.array.isRequired
};

export default SelectList;
