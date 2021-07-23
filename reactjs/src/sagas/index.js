import { all } from "redux-saga/effects";
import { itemSaga } from "./itemSaga";

export default function* rootSaga() {
  yield all([...itemSaga]);
}
