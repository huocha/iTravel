
const initialState = {
	cursor: "",
	posts: [],
	error: undefined,
	isLoading: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
	case 'GET_FEED':
		return {...state, isLoading: true };
	case 'GET_FEED_SUCCESS':
		return {...state,
				posts: action.payload.data,
				cursor: action.payload.cursor,
				isLoading: false
			};
	case 'GET_FEED_FAILURE':
		return {...state, error: action.payload, isLoading: false };
	default:
		return state;
	}
}
