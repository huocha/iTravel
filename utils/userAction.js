import firebase from 'firebase';
const userCollection = firebase.firestore().collection("users");

const updateUser = data => new Promise((resolve, reject) => {

});

const userSignUp = (data, callback) => {
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
      uid: acc.uid,
      username: '',
      name: '',
      avatar: '',
      avatarBackground: '',
      bio: ''
    }
    userCollection
      .add(user)
      .then(doc => resolve({...acc, user }) )
      .catch(error => reject(error) );
  });

  Promise.resolve({})
    .then(fireAuth)
    .then(createUserInCollection)
    .then(result => callback(null, result))
    .catch(error => callback(error))
}

export {
  userSignUp
};
