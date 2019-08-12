
const initialState = {
	openDrawer: false
};

export default function (state = initialState, action) {
	switch (action.type) {
	case 'CLOSE_DRAWER':
		return {...state, openDrawer: false };
	case 'OPEN_DRAWER':
		return {...state, openDrawer: true };
  case 'TOGGLE_DRAWER':
		return {...state, openDrawer: !state.openDrawer };
	default:
		return state;
	}
}
