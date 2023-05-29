const admin = require("firebase-admin");
const serviceAccount = require("./fit4sure-de5ca-firebase-adminsdk-zstk7-b2c55e2945.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "fit4sure-de5ca.appspot.com",
});

const firebaseApp = admin.app();

module.exports = firebaseApp;