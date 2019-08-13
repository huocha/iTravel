import firebase from 'firebase';
const userCollection = firebase.firestore().collection("users");
const documentId = firebase.firestore.FieldPath.documentId();

const fetchUsers = (data, feedActions) => {
  const { size, start, currentUid } = data;

  let ref = userCollection.limit(size);

  if (start) {
    ref = ref.orderBy(documentId).startAfter(start);
  }
  ref
    .get()
    .then((querySnapShot) => {
      let data = [];
      querySnapShot.forEach((doc) => {
        if (doc.exists && doc.id !== currentUid) {
          const user = doc.data() || {};

          data.push({
            id: doc.id,
            username: user.username,
            avatar: user.avatar,
            bio: user.bio
          });
        }
      });
      //const lastVisible = data[data.length - 1].key; { data, cursor: lastVisible }
      return feedActions.fetchUsersSuccess(data)
    })
    .catch(error => feedActions.fetchUsersFailure(error))

  return {
    type: 'FETCH_USERS'
  }
}

const fetchUsersSuccess = response => ({
  type: 'FETCH_USERS_SUCCESS',
  payload: response,
})

const fetchUsersFailure = error => ({
  type: 'FETCH_USERS_FAILURE',
  payload: error
})

export {
    fetchUsers,
    fetchUsersSuccess,
    fetchUsersFailure,
};
