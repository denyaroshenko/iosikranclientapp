import {
	SET_LOCKED_APP,
	REMOVE_LOCKED_APP
} from "../actions/types";

const initialState = true

export default function (state = initialState, action) {
	const { type } = action;

	switch (type) {
		case SET_LOCKED_APP:
			return true;

		case REMOVE_LOCKED_APP:
			return false;

		default:
			return state;
	}
}
