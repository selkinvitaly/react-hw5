"use strict";

import ArticleStore from "./ArticleStore";
import CommentStore from "./CommentStore";

let stores = {};

Object.assign(stores, {
  articles: new ArticleStore(stores),
  comments: new CommentStore(stores)
});

window.stores = stores; // dev

export const articlesStore = stores.articles;
export const commentsStore = stores.comments;
