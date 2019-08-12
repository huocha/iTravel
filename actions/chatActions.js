/*
* notes: because redux need middleware for async function and props seems to load very slow
*       use module actions instead 12/08/2019
*/
import * as firebase from 'firebase';
// helpers
const uid = () => {
  return (firebase.auth().currentUser || {}).uid;
}

// one-to-one chat uid = user1 + user2
/*
*Check if user1’s id is less than user2's
if(uid1 <uid2){
  return uid1+uid2;
}
else{
  return uid2+uid1;
}
*/

const parse = (snapshot) => {

  const { timestamp: numberStamp, text, user } = snapshot.val();
  const { key: _id } = snapshot;
  const timestamp = new Date(numberStamp);
  const message = {
    _id,
    timestamp,
    text,
    user,
  };
  return message;
};

const userOnChat = (callback) => {
  const uid = (firebase.auth().currentUser || {}).uid;
  firebase.database()
    .ref(`messages/${uid}`)
    .limitToLast(20)
    .on('child_added', (snapshot) => {
      callback(parse(snapshot))
    })
}

const userOnSend = (messages) => {
  const uid = (firebase.auth().currentUser || {}).uid;
  for (let i = 0; i < messages.length; i++) {
    const { text, user } = messages[i];

    const message = {
      text,
      user,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
    firebase.database().ref(`messages/${uid}`).push(message);
  }
};

const userOffChat = _ => {
  const uid = (firebase.auth().currentUser || {}).uid;
  firebase.database().ref(`messages/${uid}`).off()
}


export {
    userOnChat,
    userOffChat,
    userOnSend
}
