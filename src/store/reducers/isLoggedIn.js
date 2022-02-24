import {
	SET_LOGGED_IN,
	REMOVE_LOGGED_IN
} from "../actions/types";

const initialState = false

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_LOGGED_IN:
			return true;

		case REMOVE_LOGGED_IN:
			return false;

		default:
			return state;
	}
}
