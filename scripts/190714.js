const admin = require('../node_modules/firebase-admin');
const serviceAccount = require("./secretKey.json");
const data = require("../utils/listMuseum.json");

const collectionKey = "museums"; //name of the collection
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://awesome-travel-8e0cb.firebaseio.com"
});
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
if (data && (typeof data === "object")) {

  Object.keys(data).forEach(docKey => {
    firestore.collection(collectionKey).doc().set(data[docKey]).then((res) => {
      console.log("Document " + docKey + " successfully written!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  });
}
