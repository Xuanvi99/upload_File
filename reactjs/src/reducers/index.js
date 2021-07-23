import { combineReducers } from "redux";
import itemReduce from "./itemReduce";
export default combineReducers({
  Items: itemReduce,
});
