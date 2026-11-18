const firebaseConfig = {
  apiKey: "JOUW_API_KEY",
  authDomain: "JOUW_://firebaseapp.com",
  databaseURL: "https://JOUW_PROJECT-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "JOUW_PROJECT"
};

(function() {
  var base = 'https://' + '://gstatic.com';
  var s1 = document.createElement('script');
  s1.src = base + 'firebase-app-compat.js';
  s1.onload = function() {
    var s2 = document.createElement('script');
    s2.src = base + 'firebase-database-compat.js';
    s2.onload = function() {
      if (typeof initFirebase === 'function') initFirebase();
    };
    document.head.appendChild(s2);
  };
  document.head.appendChild(s1);
})();
