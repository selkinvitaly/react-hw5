"use strict";

import AppDispatcher from "../dispatcher";
import {
  ACT_DELETE_ARTICLE,
  ACT_LOAD_ALL_ARTICLES_OK,
  ACT_LOAD_ALL_ARTICLES_FAIL,
  ACT_LOAD_ARTICLE_OK,
  ACT_LOAD_ARTICLE_FAIL
} from "../consts/actions";

export function deleteArticle(id) {
  AppDispatcher.dispatch({
    type: ACT_DELETE_ARTICLE,
    action: { id }
  });
};

export function getArticles() {
  const url = "api/article/";

  setTimeout(() => {

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(articles => {
        AppDispatcher.dispatch({
          type: ACT_LOAD_ALL_ARTICLES_OK,
          action: { articles }
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: ACT_LOAD_ALL_ARTICLES_FAIL,
          action: { err }
        });
      });

  }, 500);

};

export function getArticle(id) {
  const url = `api/article/${id}`;

  setTimeout(() => {

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(article => {
        AppDispatcher.dispatch({
          type: ACT_LOAD_ARTICLE_OK,
          action: { article }
        });
      })
      .catch(err => {
        AppDispatcher.dispatch({
          type: ACT_LOAD_ARTICLE_FAIL,
          action: { err }
        });
      });

  }, 500);

};
