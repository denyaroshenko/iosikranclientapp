import {
  SET_USER_DATA,
  CLEAR_USER_DATA
} from "../actions/types";

const initialState = null

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_DATA:
      return payload;

    case CLEAR_USER_DATA:
      return null;

    default:
      return state;
  }
}
