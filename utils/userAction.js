import firebase from 'firebase';
const userCollection = firebase.firestore().collection("users");

const getCurrentUser = () => new Promise((resolve, reject) => {
  const getUid = acc => new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve({...acc, uid: user.uid });
      }
      else {
        reject();
      }
    })
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
    .then(acc => resolve(acc))
    .catch(error => reject(error))
});

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
    .then(result => callback(null, result))
    .catch(error => callback(error))
}

export {
  userSignUp,
  getCurrentUser,

};
