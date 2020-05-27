// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js");

var firebaseConfig = {
  apiKey: "AIzaSyA65TwsHCyz3vvA1M68UNMqb7N7bZVY8Oc",
  authDomain: "hath-milao.firebaseapp.com",
  databaseURL: "https://hath-milao.firebaseio.com",
  projectId: "hath-milao",
  storageBucket: "hath-milao.appspot.com",
  messagingSenderId: "810610371411",
  appId: "1:810610371411:web:34f71c27fa37a4e8188fa6",
  measurementId: "G-V9MN7L9NB1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body."
    // icon: "/firebase-logo.png"
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
// [END background_handler]
