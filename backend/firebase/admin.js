const admin = require("firebase-admin");
const serviceAccount = require("./student-project-manageme-d06bb-firebase-adminsdk-o4soe-5ccc98135f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://student-project-manageme-d06bb.appspot.com",
});

const db = admin.firestore();
const storage = admin.storage();
const bucket = storage.bucket();

module.exports = { admin, db, bucket };
