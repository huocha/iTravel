
const initialState = {
	conversations: [],
  error: undefined,
  isLoading: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
  case 'FETCH_CONVERSATIONS':
    return { ...state, isLoading: true, error: undefined };
  case 'FETCH_CONVERSATIONS_SUCCESS':
    return { ...state, isLoading: false, conversations: action.payload }
  case 'FETCH_CONVERSATIONS_FAILURE':
    return { ...state, isLoading: false, error: action.payload }
	default:
		return state;
	}
}
