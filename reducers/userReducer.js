import { userInfos } from '../utils/storage';

const initialState = {
	infos: {},
};

export default function (state = initialState, action) {
	switch (action.type) {
	case 'LOGIN':
  	return state;
	case 'LOGIN_SUCCESS': {

      userInfos.set(action.payload);
      return {
          ...state,
          ...{
              infos: action.payload,
              error: undefined,
          },
      };
  }

	case 'LOGIN_FAILURE':
    return { ...state, ...{ error: action.data } };
	case 'REGISTER':
    return state;
  case 'REGISTER_SUCCESS': {
    userInfos.set(action.payload);
    return {
        ...state,
        ...{
            infos: action.payload,
        },
    };
  }
  case 'REGISTER_FAILURE':
    return { ...state, ...{ error: action.data } };
	default:
		return state;
	}
}
