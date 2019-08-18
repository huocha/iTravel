import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqjrC6KJ9HO10y-xfHq2L7fOAlbfeP_Z8",
  authDomain: "awesome-travel-8e0cb.firebaseapp.com",
  databaseURL: "https://awesome-travel-8e0cb.firebaseio.com",
  projectId: "awesome-travel-8e0cb",
  storageBucket: "awesome-travel-8e0cb.appspot.com",
  messagingSenderId: "679182780721",
  appId: "1:679182780721:web:80cc3e2e23cc27d5"
};

firebase.initializeApp(firebaseConfig);

const userCollection = firebase.firestore().collection("users");
const FieldValue = firebase.firestore.FieldValue;

const register = (data, userActions) => {
  const { email, password } = data;

  const fireAuth = acc => new Promise((resolve, reject) => {
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => resolve({...acc, uid: result.user.uid }))
      .catch(error => reject(error));
  });

  const createUserInCollection = acc => new Promise((resolve, reject) => {
    if (!acc.uid) { console.log("no uid"); reject(); }

    const user = {
      email,
      username: '',
      avatar: '',
      avatarBackground: '',
      bio: ''
    }
    userCollection
      .doc(acc.uid)
      .set(user)
      .then(doc => resolve({...acc, user }) )
      .catch(error => reject(error) );
  });

  Promise.resolve({})
    .then(fireAuth)
    .then(createUserInCollection)
    .then(user => userActions.registerSuccess(user))
    .catch(err => userActions.registerFailure(err))

    return {
        type: 'REGISTER',
    };
};

const registerSuccess = response => ({
    type: 'REGISTER_SUCCESS',
    payload: response,
});

const registerFailure = err => ({
    type: 'REGISTER_FAILURE',
    data: err,
});

const login = (email, password, userActions) => {
  const getUid = acc => new Promise((resolve, reject) => {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          resolve({...acc, uid: user.user.uid });
          return;
        }
        reject();
      })
      .catch(error => reject(error));
  });

  const getUser = acc => new Promise((resolve, reject) => {
    if (!acc.uid) { reject(); return; }
    userCollection.doc(acc.uid).get()
      .then((doc) => {
        if (doc.exists) {
          resolve({...acc, user: doc.data() })
        } else {
          resolve(acc);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        reject(error);
      });
  });

  Promise.resolve({})
    .then(getUid)
    .then(getUser)
    .then(acc => userActions.loginSuccess(acc))
    .catch(error => userActions.loginFailure(error))

  return {
      type: 'LOGIN',
  };
};

const loginSuccess = response => ({
    type: 'LOGIN_SUCCESS',
    payload: response,
});

const loginFailure = () => ({
    type: 'LOGIN_FAILURE',
    data: 'credentials.wrong',
});

const logout = (userActions) => {
  firebase.auth().signOut()
    .then(_ => userActions.logoutSuccess())
    .catch(error => userActions.logoutFailure(error));

  return {
    type: 'LOG_OUT'
  }
}

const logoutSuccess = _ => ({
  type: 'LOG_OUT_SUCCESS'
})

const logoutFailure = error => ({
  type: 'LOG_OUT_FAILURE',
  payload: error
})

const userUpdate = (uid, update, userActions) => {

  userCollection
    .doc(uid)
    .update(update)
    .then(() => {
      userActions.userUpdateSuccess(update);
    })
    .catch(error => userActions.userUpdateFailure(error));

  return {
    type: 'UPDATE_USER'
  }
}

const userUpdateSuccess = response => ({
  type: 'UPDATE_USER_SUCCESS',
  payload: response
});

const userUpdateFailure = (error) => ({
  type: 'UPDATE_USER_FAILURE',
  data: error
});

const userLike = (uid, postId, userActions) => {

  const update = { likes: firebase.firestore.FieldValue.arrayUnion(postId) }
  userCollection
    .doc(uid)
    .update(update)
    .then(() => {
      userActions.userLikeSuccess(postId);
    })
    .catch(error => console.log(error));

  return {
    type: 'USER_LIKE'
  }
}

const userLikeSuccess = (response) => ({
  type: 'USER_LIKE_SUCCESS',
  payload: response
})

const userDislike = (uid, postId, userActions) => {

  const update = { likes: firebase.firestore.FieldValue.arrayRemove(postId) }
  userCollection
    .doc(uid)
    .update(update)
    .then(() => {
      userActions.userDisLikeSuccess(postId);
    })
    .catch(error => console.log(error));

  return {
    type: 'USER_DISLIKE'
  }
}

const userDisLikeSuccess = (response) => ({
  type: 'USER_DISLIKE_SUCCESS',
  payload: response
})

export {
  login,
  loginSuccess,
  loginFailure,

  register,
  registerSuccess,
  registerFailure,

  logout,
  logoutSuccess,
  logoutFailure,

  userUpdate,
  userUpdateSuccess,
  userUpdateFailure,

  userLike,
  userDislike,

  userLikeSuccess,
  userDisLikeSuccess,

}
