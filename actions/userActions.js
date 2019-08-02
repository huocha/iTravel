import firebase from 'firebase';

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
  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => userActions.loginSuccess(user))
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
      userActions.loginFailure();
    });

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

export {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
}
