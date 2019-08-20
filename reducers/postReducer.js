const initialState = {
	posts: [],
	currentPosts: []
};

const applyAddPost = (state, action) => {
	const { posts } = state;

	return { ...state, isLoading: false, posts: [action.payload.data].concat(posts) }
}

export default function (state = initialState, action) {
	switch (action.type) {
	case 'FETCH_POSTS':
		return { ...state, isLoading: true }
	case 'FETCH_POSTS_SUCCESS':
		return { ...state, posts: action.payload.data, cursor: action.payload.lastVisible, isLoading: false }
	case 'FETCH_POSTS_FAILURE':
		return { ...state, error: action.payload, isLoading: false }
	case 'FETCH_CURRENT_USER_POSTS':
		return { ...state }
	case 'FETCH_CURRENT_USER_POSTS_SUCCESS':
		return { ...state, currentPosts: action.payload }
	case 'FETCH_CURRENT_USER_POSTS_FAILURE':
		return { ...state, error: action.payload }
	case 'ADD_POST':
		return { ...state, isLoading: true };
	case 'ADD_POST_SUCCESS':
		return applyAddPost(state, action)

	default:
		return state;
	}
}
