var proto = window.location.protocol + '//';
var project = 'nnfc-trails';

const firebaseConfig = {
  apiKey: "AIzaSyAEAitVKVQ5LkFHBeUh4WdHFSamYcBNEbI",
  authDomain: project + ".firebaseapp.com",
  databaseURL: proto + project + "-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: project
};

(function() {
  var host = ['www', 'gstatic', 'com'].join('.');
  var pad = proto + host + '/firebasejs/10.14.1/';
  var s1 = document.createElement('script');
  s1.src = pad + 'firebase-app-compat.js';
  s1.onload = function() {
    var s2 = document.createElement('script');
    s2.src = pad + 'firebase-database-compat.js';
    s2.onload = function() {
      if (typeof initFirebase === 'function') initFirebase();
    };
    document.head.appendChild(s2);
  };
  document.head.appendChild(s1);
})();
