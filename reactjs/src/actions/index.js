import * as types from "../constants";

export function getImg(payload) {
  return {
    type: types.GET_REQUEST,
    payload,
  };
}

export function postImg(payload) {
  return {
    type: types.POST_REQUEST,
    payload,
  };
}

export function deleteImg(payload) {
  return {
    type: types.DELETE_REQUEST,
    payload,
  };
}

export function putImg(payload) {
  return {
    type: types.PUT_REQUEST,
    payload,
  };
}
