import { userInfos } from '../utils/storage';

const initialState = {
	infos: {},
	isLoading: false,
};

export default function (state = initialState, action) {
	switch (action.type) {
	case 'LOGIN':
  	return { ...state, isLoading: true };
	case 'LOGIN_SUCCESS': {

      userInfos.set(action.payload);
      return {
          ...state,
          ...{
              infos: action.payload,
              error: undefined,
							isLoading: false,
          },
      };
  }

	case 'LOGIN_FAILURE':
    return { ...state, ...{ error: action.data, isLoading: false, } };
	case 'REGISTER':
    return { ...state, isLoading: true };
  case 'REGISTER_SUCCESS': {
    userInfos.set(action.payload);
    return {
        ...state,
        ...{
            infos: action.payload,
						isLoading: false,
        },
    };
  }
  case 'REGISTER_FAILURE':
    return { ...state, ...{ error: action.data, isLoading: false } };
	default:
		return state;
	}
}
