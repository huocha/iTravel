const initialState = {
	posts: []
};

const applyAddPost = (state, action) => {
	const { posts } = state;

	return { ...state, isLoading: false, posts: posts.concat(action.payload) }
}

export default function (state = initialState, action) {
	switch (action.type) {
	case 'FETCH_POSTS':
		return { ...state, isLoading: true }
	case 'FETCH_POSTS_SUCCESS':
		return { ...state, posts: action.payload, isLoading: false }
	case 'FETCH_POSTS_FAILURE':
		return { ...state, error: action.payload, isLoading: false}
	case 'ADD_POST':
		return { ...state, isLoading: true };
	case 'ADD_POST_SUCCESS':
		return applyAddPost(state, action)

	default:
		return state;
	}
}
