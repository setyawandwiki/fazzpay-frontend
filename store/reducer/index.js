import { combineReducers } from "redux";

import counter from "./counter";
import user from "./user";
import topUp from "./topUp";

export default combineReducers({
  counter,
  user,
  topUp,
});
