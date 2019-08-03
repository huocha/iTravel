import firebase from 'firebase';
const userCollection = firebase.firestore().collection("users");

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

const userUpdate = (uid, data) => new Promise((resolve, reject) => {
  userCollection
    .doc(uid)
    .get()
    .then(doc => {

      userCollection.
        doc(uid)
        .update({...doc.data(), ...data })
        .then(_ => resolve())
        .catch(error => reject(error) );
    })
    .catch(error => reject(error) );
});

export {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
  userUpdate,
}
