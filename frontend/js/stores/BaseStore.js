"use strict";

import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import { EVT_ERROR_LOAD, EVT_UPDATE } from "../consts/events"

class BaseStore extends EventEmitter {

  constructor(stores, data = []) {
    super();
    this._stores = stores;
    this._items = [];
    data.forEach(this.add);
  }

  add(item) {
    this._items.push(item);
  }

  delete(id) {
    this._items = this._items.filter(item => item.id !== id);
  }

  getAll() {
    return this._items.slice().sort((a, b) => a.id - b.id);
  }

  isEmpty() {
    return this._items.length === 0;
  }

  addUpdateListener(cb) {
    this.on(EVT_UPDATE, cb);
  }

  addErrorListener(cb) {
    this.on(EVT_ERROR_LOAD, cb);
  }

  removeUpdateListener(cb) {
    this.removeListener(EVT_UPDATE, cb);
  }

  removeErrorListener(cb) {
    this.removeListener(EVT_ERROR_LOAD, cb);
  }

  updateArticles() {
    this.emit(EVT_UPDATE);
  }

  getById(id) {
    return this._items.filter(item => item.id === id)[0];
  }

  errorLoading(err) {
    this.emit(EVT_ERROR_LOAD, err);
  }

}

export default BaseStore;
