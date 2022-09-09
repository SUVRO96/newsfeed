import { Constants } from "../../redux/constants";

export const setLoginData = loginData => {
  return {
    type: Constants.SET_LOGIN_INFO,
    payload: loginData,
  };
};
