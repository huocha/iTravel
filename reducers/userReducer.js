const initialState = {
	currentUser: undefined,
	users: [],
};

export default function (state = initialState, action) {
	switch (action.type) {
	case 'LOGIN_SUCCESS':
		state = { ...state, currentUser: action.payload };
		break;
	case 'LOGOUT_SUCCESS':
		state = { ...state, currentUser: undefined };
		break;
	case 'LOGOUT_FAIL':
		state = { ...state, currentUser: action.payload };
		break;
	case 'GET_CURRENT_USER_FAIL':
		state = { ...state, error: action.payload };
		break;
	case 'GET_CURRENT_USER_SUCCESS':
		state = { ...state, currentUser: action.payload };
		break;
	case 'FETCH_USERS':
		state = { ...state, list: action.payload };
		break;
	}

	return state;
}
