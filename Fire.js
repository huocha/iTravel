import uuid from 'uuid';

import getUserInfo from './utils/getUserInfo';
import shrinkImageAsync from './utils/shrinkImageAsync';
import uploadPhoto from './utils/uploadPhoto';

const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const collectionName = 'itravel';

class Fire {
  constructor() {
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
    // Some nonsense...
    firebase.firestore().settings({ timestampsInSnapshots: true });

    // Listen for auth
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
    });
  }

  // Download Data
  getPaged = async ({ size, start }) => {
    let ref = this.collection.orderBy('timestamp', 'desc').limit(size);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      const querySnapshot = await ref.get();
      const data = [];
      querySnapshot.forEach(function(doc) {
        if (doc.exists) {
          const post = doc.data() || {};

          // Reduce the name
          const user = post.user || {};

          const name = user.deviceName;
          console.log({ doc })
          const reduced = {
            key: doc.id,
            name: (name || 'Secret Duck').trim(),
            ...post,
          };
          data.push(reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  // Upload Data
  uploadPhotoAsync = async uri => {
    const path = `${collectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  post = async ({ text, image: localUri }) => {
    try {
      const { uri: reducedImage, width, height } = await shrinkImageAsync(
        localUri,
      );

      const remoteUri = await this.uploadPhotoAsync(reducedImage);
      this.collection.add({
        text,
        uid: this.uid,
        timestamp: this.timestamp,
        imageWidth: width,
        imageHeight: height,
        image: remoteUri,
        user: getUserInfo(),
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  // Helpers
  get collection() {
    return firebase.firestore().collection(collectionName);
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
