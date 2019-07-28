import firebase from 'firebase';
import uuid from 'uuid';

function uploadPhoto(uri, uploadUri) {
  return new Promise(async (res, rej) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref(uploadUri);
    const unsubscribe = ref.put(blob).on(
      'state_changed',
      state => {},
      err => {
        unsubscribe();
        rej(err);
      },
      async () => {
        unsubscribe();
        const url = await ref.getDownloadURL();
        res(url);
      },
    );
  });
}


async function uploadImageAsync(uid, uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(`user/${uid}/${uuid.v4()}`);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

export {
  uploadPhoto,
  uploadImageAsync
}
