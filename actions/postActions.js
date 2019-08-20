import firebase from 'firebase';
const postCollection = firebase.firestore().collection("posts");
const userCollection = firebase.firestore().collection("users");

const size = 20;

const fetchPosts = (start, uid, postActions) => {
  const reference = userCollection.doc(uid);
  let ref = postCollection.limit(size);

  if (start) {
    ref = ref.orderBy("createdAt").startAfter(start);
  }

  ref
    .where("userRef", "==", reference)
    .orderBy("createdAt", 'desc')
    .get()
    .then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach(async(doc) => {
        let newItem = doc.data();
        newItem.key = doc.id;

        await newItem.userRef
          .get()
          .then(res => {
            const userData = res.data();
            newItem.user = { avatar: userData.avatar, username: userData.username };
            delete newItem.userRef;

            data.push(newItem);
          })
          .catch(err => console.error(err));
        const lastVisible = data[data.length - 1].createdAt;

        return postActions.fetchPostsSuccess({ data, cursor: lastVisible });
      });
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
  let { user } = data;

  data.userRef = firebase.firestore().doc('users/'+user);
  delete data.user;

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
