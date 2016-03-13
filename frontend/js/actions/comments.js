"use strict";

import AppDispatcher from "../dispatcher";
import {
  ACT_ADD_COMMENT,
  ACT_LOAD_COMMENTS_OK,
  ACT_LOAD_COMMENTS_FAIL
} from "../consts/actions";

export function addComment(articleId, text) {
  AppDispatcher.dispatch({
    type: ACT_ADD_COMMENT,
    action: { articleId, text }
  });
};

export function getCommentsByArticle(articleId) {
  const url = `api/comment?article=${articleId}`;

  setTimeout(() => {

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        AppDispatcher.dispatch({
          type: ACT_LOAD_COMMENTS_OK,
          action: { comments: json }
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: ACT_LOAD_COMMENTS_FAIL,
          action: { err }
        });
      });

  }, 500);

};
