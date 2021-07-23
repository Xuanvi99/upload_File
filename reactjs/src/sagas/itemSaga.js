import * as types from "../constants";
import callApi from "../fetchAPIs/callAPI";
import { put, select, takeEvery } from "redux-saga/effects";

function* getListImg(action) {
  try {
    const res = yield callApi(
      "GET",
      `?page=${action.payload.activePage}&limit=${types.LIMIT}&filename=${action.payload.textSearch}`,
      ""
    );
    yield put({
      type: types.GET_SUCCESS,
      payload: {
        res,
        activePage: action.payload.activePage,
        textSearch: action.payload.textSearch,
      },
    });
  } catch (err) {
    yield put({
      type: types.GET_FAIlURE,
      payload: {
        errorMessage: err.message,
      },
    });
  }
}
function* getOneImg(action) {
  try {
    const res = yield callApi("GET", `id/${action.payload.textSearch}`, "");
    yield put({
      type: types.GET_ONE_SUCCESS,
      payload: {
        res,
        activePage: 1,
        textSearch: action.payload.textSearch,
      },
    });
  } catch (err) {
    yield put({
      type: types.GET_ONE_FAIlURE,
      payload: {
        errorMessage: err.message,
      },
    });
  }
}
function* postListImg(action) {
  try {
    const res = yield callApi("POST", "", action.payload.fileData);
    console.log(res);
    let textSearch = yield select((state) => state.Items.textSearch);
    let Search = textSearch ? action.payload.textSearch : "";
    if (textSearch.includes(Search)) {
      let Data = yield callApi("GET", `?&filename=${Search}`, "");
      let totalPage = Math.ceil(Data.listImg.length / types.LIMIT);

      yield put({
        type: types.POST_SUCCESS,
      });
      yield put({
        type: types.GET_REQUEST,
        payload: {
          activePage: totalPage,
          textSearch: Search,
        },
      });
    } else {
      Search = res.result._id;
      yield put({
        type: types.POST_SUCCESS,
      });
      yield put({
        type: types.GET_ONE_REQUEST,
        payload: {
          activePage: 1,
          textSearch: Search,
        },
      });
    }
  } catch (err) {
    yield put({
      type: types.POST_FAIlURE,
      payload: {
        errorMessage: err.message,
      },
    });
  }
}

function* deleteListImg(action) {
  try {
    yield callApi("DELETE", `${action.payload.id}`, "");
    let textSearch = yield select((state) => state.Items.textSearch);
    let Search = textSearch ? textSearch : "";

    let activePage = yield select((state) => state.Items.activePage);

    let Data = yield callApi("GET", `?filename=${Search}`, "");
    let Page = Math.ceil(Data.listImg.length / types.LIMIT);
    let totalPage = Page ? Page : 1;

    yield put({
      type: types.DELETE_REQUEST,
    });
    yield put({
      type: types.GET_REQUEST,
      payload: {
        activePage: activePage < totalPage ? activePage : totalPage,
        textSearch: Search,
      },
    });
  } catch (err) {
    yield put({
      type: types.DELETE_FAIlURE,
      payload: {
        errorMessage: err.message,
      },
    });
  }
}
function* putListImg(action) {
  try {
    yield callApi("PUT", `${action.payload.id}`, action.payload.fileData);
    let activePage = yield select((state) => state.Items.activePage);
    let textSearch = yield select((state) => state.Items.textSearch);
    let Search = textSearch ? action.payload.textSearch : "";
    if (textSearch.includes(Search)) {
      let Data = yield callApi("GET", `?&filename=${Search}`, "");
      let Page = Math.ceil(Data.listImg.length / types.LIMIT);
      let totalPage = Page ? Page : 1;

      yield put({
        type: types.PUT_SUCCESS,
      });
      yield put({
        type: types.GET_REQUEST,
        payload: {
          activePage: activePage < totalPage ? activePage : totalPage,
          textSearch: Search,
        },
      });
    } else {
      Search = action.payload.id;
      yield put({
        type: types.PUT_SUCCESS,
      });
      yield put({
        type: types.GET_ONE_REQUEST,
        payload: {
          activePage: 1,
          textSearch: Search,
        },
      });
    }
  } catch (err) {
    yield put({
      type: types.PUT_FAIlURE,
      payload: {
        errorMessage: err.message,
      },
    });
  }
}

export const itemSaga = [
  takeEvery(types.GET_REQUEST, getListImg),
  takeEvery(types.GET_ONE_REQUEST, getOneImg),
  takeEvery(types.POST_REQUEST, postListImg),
  takeEvery(types.DELETE_REQUEST, deleteListImg),
  takeEvery(types.PUT_REQUEST, putListImg),
];
