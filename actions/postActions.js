import firebase from 'firebase';
const postCollection = firebase.firestore().collection("posts");

const fetchPosts = (uid, postActions) => {
  postCollection
    .where("user", "==", uid)
    .get()
    .then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      return postActions.fetchPostsSuccess(data);
    })
    .catch(error => postActions.fetchPostsFailure(error))

  return {
    type: 'FETCH_POSTS'
  }
}

const fetchPostsSuccess = response => ({
  type: 'FETCH_POSTS_SUCCESS',
  payload: response
})


const fetchPostsFailure = error => ({
  type: 'FETCH_POSTS_FAILURE',
  payload: error
})

const userAddPost = (data, postActions) => {
  postCollection
    .doc()
    .set(data)
    .then(() => {
      postActions.userAddPostSuccess(data);
    })
    .catch(error => console.log(error));

  return {
    type: 'ADD_POST'
  }
}

const userAddPostSuccess = response => ({
  type: 'ADD_POST_SUCCESS',
  payload: response
})

export {
  fetchPosts,
  fetchPostsSuccess,
  fetchPostsFailure,

  userAddPost,
  userAddPostSuccess
}
