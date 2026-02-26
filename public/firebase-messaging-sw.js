importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCdDuniK-80Ey6w7QFq1TZw7dAnTYTBrv0",
  authDomain: "ibytex-production-c6ee3.firebaseapp.com",
  projectId: "ibytex-production-c6ee3",
  storageBucket: "ibytex-production-c6ee3.firebasestorage.app",
  messagingSenderId: "153630055910",
  appId: "1:153630055910:web:dc70cb5b85bb87760d0a27"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logot.png"
  });
});