import { SET_LOCKED_APP, REMOVE_LOCKED_APP } from "./types";

export const setLockedApp = () => ({
  type: SET_LOCKED_APP,
});

export const removeLockedApp = () => ({
  type: REMOVE_LOCKED_APP,
});
