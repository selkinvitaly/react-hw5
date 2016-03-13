"use strict";

import BaseStore from "./BaseStore";
import {
  ACT_ADD_COMMENT,
  ACT_LOAD_COMMENTS_OK,
  ACT_LOAD_COMMENTS_FAIL
} from "../consts/actions";
import AppDispatcher from "../dispatcher";

class CommentStore extends BaseStore {

  constructor(...args) {
    super(...args);

    AppDispatcher.register(action => {
      const { type, action:data } = action;

      switch (type) {
        case ACT_ADD_COMMENT:
          let timeStamp = new Date().toString();
          let commentId = +new Date();
          let text = data.text;
          let user = data.user || "guest";
          let articleId = data.articleId;
          let article = this._stores.articles.getById(articleId);

          article.comments = article.comments || [];
          article.comments.push(commentId);

          this.add({
            id: commentId,
            text: text,
            user: user,
            timeStamp: timeStamp,
            article: articleId
          });
          this._stores.articles.updateArticles();
          break;

        case ACT_LOAD_COMMENTS_OK:
          data.comments.forEach(this.add.bind(this));
          this._stores.articles.updateArticles();
          break;

        case ACT_LOAD_COMMENTS_FAIL:
          this.errorLoading(data.err);
          break;
      }
    });
  }

  getCommentsByArticleId(articleId) {
    return this._items.filter(comment => comment.article === articleId);
  }

}

export default CommentStore;
