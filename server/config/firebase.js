const { initializeApp, cert } = require('firebase-admin/app');

const serviceAccount = require('./firebase-service-account.json');

function callDatabase() {
    initializeApp({
        credential: cert(serviceAccount)
    });
}

module.exports = { callDatabase }



// // Import the funAnalytics(app);ctions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAdUjXCTADYo9Y1CQWXvG8_qMJEEVe3UiI",
//     authDomain: "attarra-e80ee.firebaseapp.com",
//     projectId: "attarra-e80ee",
//     storageBucket: "attarra-e80ee.appspot.com",
//     messagingSenderId: "35231514717",
//     appId: "1:35231514717:web:d62937e07e16e97c84cdb4",
//     measurementId: "G-0MDHP8KXQN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = get