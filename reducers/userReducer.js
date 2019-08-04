import { userInfos } from '../utils/storage';

const initialState = {
	infos: {},
	isLoading: false,
};

const applyUpdateUser = (state, action) => {
	const newInfos = {
		...state.infos,
		user: {...state.infos.user,...action.payload }
	}

	userInfos.set(newInfos)
	return {
		...state,
		isLoading: false,
		infos: newInfos
	}
}

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

	case 'UPDATE_USER':
		return { ...state, isLoading: true };

	case 'UPDATE_USER_SUCCESS':
		return applyUpdateUser(state, action);

	case 'UPDATE_USER_FAILURE':
		return {...state, isLoading: false, error: action.payload };

	default:
		return state;
	}
}
