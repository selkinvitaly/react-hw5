"use strict";

import BaseStore from "./BaseStore";
import {
  ACT_DELETE_ARTICLE,
  ACT_LOAD_ALL_ARTICLES_OK,
  ACT_LOAD_ALL_ARTICLES_FAIL,
  ACT_LOAD_ARTICLE_OK,
  ACT_LOAD_ARTICLE_FAIL
} from "../consts/actions";
import dispatcher from "../dispatcher";

class ArticleStore extends BaseStore {

  constructor(...args) {
    super(...args);

    dispatcher.register(action => {
      const { type, action:data } = action;

      switch (type) {
        case ACT_DELETE_ARTICLE:
          this.delete(data.id);
          this.updateArticles();
          break;

        case ACT_LOAD_ALL_ARTICLES_OK:
          data.articles.forEach(this.add.bind(this));
          this.updateArticles();
          break;

        case ACT_LOAD_ALL_ARTICLES_FAIL:
          this.errorLoading(data.err);
          break;

        case ACT_LOAD_ARTICLE_OK:
          this.delete(data.article.id);
          this.add(data.article);
          this.updateArticles();
          break;

        case ACT_LOAD_ARTICLE_FAIL:
          this.errorLoading(data.err);
          break;
      }

    });
  }

}

export default ArticleStore;
