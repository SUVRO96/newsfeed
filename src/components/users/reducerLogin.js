import { Constants } from "../../redux/constants";

const initialObj = {};
export const reducerLogin = (state = initialObj, action) => {
  const { type, payload } = action;
  switch (type) {
    case Constants.SET_LOGIN_INFO:
      return { loginDataRedux: payload };
    default:
      return state;
  }
};
