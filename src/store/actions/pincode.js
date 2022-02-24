import { SET_PINCODE, CLEAR_PINCODE } from "./types";

export const setPincode = (pincode) => ({
  type: SET_PINCODE,
  payload: pincode,
});

export const clearPincode = () => ({
  type: CLEAR_PINCODE,
});
