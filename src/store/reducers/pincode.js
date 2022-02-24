import {
  SET_PINCODE,
  CLEAR_PINCODE
} from "../actions/types";

const initialState = null

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PINCODE:
      return payload;

    case CLEAR_PINCODE:
      return null;

    default:
      return state;
  }
}
