import firebase from 'firebase';
const postCollection = firebase.firestore().collection("posts");
const userCollection = firebase.firestore().collection("users");
import uuid from 'uuid';

const size = 20;

const fetchCurrentUserPosts = (uid, postActions) => {
  let ref = postCollection.limit(size);

  const reference = userCollection.doc(uid);

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

        return postActions.fetchCurrentUserPostsSuccess(data);
      });
    })
    .catch(error => postActions.fetchCurrentUserPostsFailure(error))

  return {
    type: 'FETCH_CURRENT_USER_POSTS'
  }
}

const fetchCurrentUserPostsSuccess = response => ({
  type: 'FETCH_CURRENT_USER_POSTS_SUCCESS',
  payload: response
})

const fetchCurrentUserPostsFailure = error => ({
  type: 'FETCH_CURRENT_USER_POSTS_FAILURE',
  payload: error
})

const fetchPosts = (start, uid, postActions) => {
  let ref = postCollection.limit(size);

  if (start) {
    ref = ref.orderBy("createdAt").startAfter(start);
  }

  if (uid) {
    const reference = userCollection.doc(uid);
    ref = ref.where("userRef", "==", reference)
  }

  ref
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
  const userData = { username: user.user.username, avatar: user.user.avatar };
  data.userRef = firebase.firestore().doc('users/'+user.uid);
  delete data.user;
  const hash = uuid.v4();

  postCollection
    .doc(hash)
    .set(data)
    .then((result) => {
        data.user = userData;
        data.key = hash;
        delete data.userRef;
        const cursor = data.createdAt;
        postActions.userAddPostSuccess({ data, cursor });

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

  fetchCurrentUserPosts,
  fetchCurrentUserPostsSuccess,
  fetchCurrentUserPostsFailure,

  userAddPost,
  userAddPostSuccess
}
