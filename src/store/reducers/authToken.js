import {
  SET_AUTH_TOKEN,
  REMOVE_AUTH_TOKEN
} from "../actions/types";

// Убираем потому что в мобилках нет локалстоража
// const user = JSON.parse(localStorage.getItem("user"));

// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };

const initialState = null

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTH_TOKEN:
      return payload;

    case REMOVE_AUTH_TOKEN:
      return null;

    default:
      return state;
  }
}
