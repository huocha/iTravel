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

const applyUserLike = (state, action) => {
	let { user } = state.infos;
	const alreadyExisted = user.likes.find(like => like === action.payload);
	if (alreadyExisted) { return;}

	user.likes = user.likes.concat(action.payload);

	const newInfos = { ...state.infos, user };

	userInfos.set(newInfos)
	return {
		...state,
		infos: newInfos
	}
}

const applyUserDisLike = (state, action) => {
	let { user } = state.infos;
	user.likes = user.likes.filter(like => like !== action.payload);

	const newInfos = { ...state.infos, user };

	userInfos.set(newInfos)
	return {
		...state,
		infos: newInfos
	}
}

const applyFetchConversation = (state, action) => {

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

	case 'LOG_OUT':
		return { ...state, isLoading: true }

	case 'LOG_OUT_SUCCESS':
		userInfos.remove();
		return { ...state, infos: {}, isLoading: false, }

	case 'LOG_OUT_FAILURE':
		return { ...state, error: action.payload, isLoading: false }

	case 'UPDATE_USER':
		return { ...state, isLoading: true };

	case 'UPDATE_USER_SUCCESS':
		return applyUpdateUser(state, action);

	case 'UPDATE_USER_FAILURE':
		return {...state, isLoading: false, error: action.payload };

	case 'USER_LIKE':
		return state;
	case 'USER_LIKE_SUCCESS':
		return applyUserLike(state, action)
	case 'USER_DISLIKE_SUCCESS':
		return applyUserDisLike(state, action)

	default:
		return state;
	}
}
