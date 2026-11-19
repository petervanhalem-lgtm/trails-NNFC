const firebaseConfig = {
  apiKey: "AIzaSyAEAitVKVQ5LkFHBeUh4WdHFSamYcBNEbI",
  authDomain: "://firebaseapp.com",
  databaseURL: "https://firebasedatabase.app",
  projectId: "nnfc-trails"
};

(function() {
  var pad = ['https:/', '://gstatic.com', 'firebasejs', '10.14.1', ''].join('/');
  var s1 = document.createElement('script');
  s1.src = pad + 'firebase-app-compat.js';
  s1.onerror = function() { alert('Fout: Firebase-script kon niet worden geladen. Controleer de internetverbinding.'); };
  s1.onload = function() {
    var s2 = document.createElement('script');
    s2.src = pad + 'firebase-database-compat.js';
    s2.onerror = function() { alert('Fout: Firebase Database-script kon niet worden geladen.'); };
    s2.onload = function() {
      if (typeof initFirebase === 'function') initFirebase();
    };
    document.head.appendChild(s2);
  };
  document.head.appendChild(s1);
})();
