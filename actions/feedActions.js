import firebase from 'firebase';

const museumCollection = firebase.firestore().collection("museums");
const documentId = firebase.firestore.FieldPath.documentId();

const getFeed = (size, start, feedActions) => {
  let ref = museumCollection.limit(size);

  if (start) {
    ref = ref.orderBy(documentId).startAfter(start);
  }

  ref.get()
    .then((querySnapShot) => {
      let data = [];
      querySnapShot.forEach((doc) => {
        if (doc.exists) {
          const post = doc.data() || {};

          data.push({ key: doc.id, ...post});
        }
      });
      const lastVisible = data[data.length - 1].key;

      return feedActions.getFeedSuccess({ data, cursor: lastVisible })
    })
    .catch(error => feedActions.getFeedFailure(error))

  return {
    type: 'GET_FEED'
  }
};

const getFeedSuccess = response => ({
    type: 'GET_FEED_SUCCESS',
    payload: response,
});

const getFeedFailure = error => ({
    type: 'GET_FEED_FAILURE',
    payload: error,
});


export {
    getFeed,
    getFeedSuccess,
    getFeedFailure,
};
