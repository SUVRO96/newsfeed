import { combineReducers } from "redux";
import { reducerLogin } from "../components/users/reducerLogin";

const reducers = combineReducers({
  login: reducerLogin,
});

export default reducers;
