const initialState = {
	searchResult: [],
  lists: [],
  error: undefined,
  isLoading: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
	case 'FETCH_USERS':
		return {...state, isLoading: true };
	case 'FETCH_USERS_SUCCESS':
		return {...state, lists: action.payload, isLoading: false };
  case 'FETCH_USERS_FAILURE':
		return {...state, error: action.payload, isLoading: false };
	default:
		return state;
	}
}
