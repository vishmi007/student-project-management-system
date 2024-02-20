const firebase = require("firebase");
require("dotenv").config();

const firebaseConfig = {
  apiKey: "AIzaSyBlgFPDekgeZ0Attz-HDnIl1P5OHQfgGGY",
  authDomain: "student-project-manageme-d06bb.firebaseapp.com",
  projectId: "student-project-manageme-d06bb",
  storageBucket: "student-project-manageme-d06bb.appspot.com",
  messagingSenderId: "601924714624",
  appId: "1:601924714624:web:0b950125cc1d6894f3a665",
  measurementId: "G-M4QB72TZK7",
};

firebase.initializeApp(firebaseConfig);
module.exports = { firebase };
