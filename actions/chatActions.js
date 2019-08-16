/*
* notes: because redux need middleware for async function and props seems to load very slow
*       use module actions instead 12/08/2019
*/

import firebase from 'firebase'; // 4.8.1

class Conversation {
  constructor() {
    this.observeAuth();
  }

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      return;
    }
  };

  setUser2 = (uid2) => {
    this.uid2 = uid2;
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    const composedUid = this.generateUid(this.uid, this.uid2);
    return firebase.database().ref(`messages/${composedUid}`);
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      sent: true,
      received: true,
      timestamp,
      createdAt: timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));


  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  generateUid = (uid1, uid2) => {
    return uid1 < uid2 ? uid1+uid2 : uid2+uid1;
  }

  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];

      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  sendNotification = message => {

  }

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Conversation.shared = new Conversation();
export default Conversation;
