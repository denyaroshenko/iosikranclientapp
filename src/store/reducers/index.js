import { combineReducers } from "redux"
import authToken from "./authToken"
import isLoggedIn from "./isLoggedIn"
import isLockedApp from "./isLockedApp"
import userData from "./userData"
// import message from "./message"
import pincode from "./pincode"

export default combineReducers({
  authToken,
  isLoggedIn,
  isLockedApp,
  userData,
  pincode,
  // message,
});
