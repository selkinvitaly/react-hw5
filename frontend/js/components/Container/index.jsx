"use strict";

import React, { Component, PropTypes } from "react";
import { articlesStore } from "../../stores/";
import * as actions from "../../actions/articles";
import SelectList from "../SelectList/";

class Container extends Component {

  constructor() {
    super();

    this.state = {
      articles: articlesStore.getAll(),
      loading: false
    };

    this._updateHandler = () => this.updateList();
    this._errorHandler = (err) => this.showError(err);
  }

  updateList() {
    this.setState({
      articles: articlesStore.getAll(),
      loading: false
    });

    console.log("updated articles"); // dev
  }

  showError(err) {
    alert(err);
    console.log(err);
  }

  componentDidMount() {
    articlesStore.addUpdateListener(this._updateHandler);
    articlesStore.addErrorListener(this._errorHandler);
  }

  componentWillUnmount() {
    articlesStore.removeUpdateListener(this._updateHandler);
    articlesStore.removeErrorListener(this._errorHandler);
  }

  clickHandler() {
    return e => {
      if (!articlesStore.isEmpty() || this.state.loading) {
        return;
      }

      this.setState({
        loading: true
      });

      actions.getArticles();
    };
  }

  getButton() {
    const style = {
      border: "1px solid #ccc",
      backgroundColor: "#f6f6f6",
      opacity: (!articlesStore.isEmpty() || this.state.loading) ? ".5" : 1
    };
    const text = this.state.loading ? "loading..." : "load articles!";

    return <p>
      <button onClick={this.clickHandler()} style={style} disabled={!articlesStore.isEmpty() || this.state.loading}>{text}</button>
    </p>
  }

  getArticles() {
    return !articlesStore.isEmpty() ? <SelectList articles={this.state.articles} /> : <p>Articles aren't yet loaded</p>;
  }

  render() {
    return (
      <div>
        {this.getButton()}
        {this.getArticles()}
      </div>
    );
  }

}

export default Container;
