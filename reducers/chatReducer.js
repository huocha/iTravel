
const initialState = {
	messages: [],
  isSending: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
	case 'USER_ON_CHAT':
		return {...state, isSending: true };
	case 'USER_ON_CHAT_SUCCESS':
		return {...state, messages: action.payload, isSending: false };
  case 'TOGGLE_DRAWER':
		return {...state, openDrawer: !state.openDrawer };
	default:
		return state;
	}
}
