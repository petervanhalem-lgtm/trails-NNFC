(function (global) {
  'use strict';

  var JAAR_REGEX = /^20\d{2}$/;
  var STORAGE_KEYS = ['nnfc_jaar', 'nnfc_actief_jaar'];
  var URL_PARAMS = ['jaar', 'y', 'year'];

  function isGeldigJaar(val) {
    return JAAR_REGEX.test(String(val == null ? '' : val).trim());
  }

  function normaliseerJaar(val) {
    return isGeldigJaar(val) ? String(val).trim() : '';
  }

  function leesJaarUitUrl() {
    try {
      var params = new URLSearchParams(global.location.search || '');
      for (var i = 0; i < URL_PARAMS.length; i++) {
        var raw = params.get(URL_PARAMS[i]);
        var j = normaliseerJaar(raw);
        if (j) return j;
      }
    } catch (e) {}
    return '';
  }

  function leesJaarUitStorage() {
    for (var i = 0; i < STORAGE_KEYS.length; i++) {
      try {
        var raw = global.localStorage.getItem(STORAGE_KEYS[i]);
        var j = normaliseerJaar(raw);
        if (j) return j;
      } catch (e) {}
    }
    return '';
  }

  function schrijfJaarNaarStorage(jaar) {
    var j = normaliseerJaar(jaar);
    if (!j) return false;
    for (var i = 0; i < STORAGE_KEYS.length; i++) {
      try {
        global.localStorage.setItem(STORAGE_KEYS[i], j);
      } catch (e) {}
    }
    return true;
  }

  function schrijfJaarNaarUrl(jaar) {
    var j = normaliseerJaar(jaar);
    if (!j) return;
    try {
      var url = new URL(global.location.href);
      if (url.searchParams.get('jaar') !== j) {
        url.searchParams.set('jaar', j);
        global.history.replaceState(global.history.state, '', url.toString());
      }
    } catch (e) {}
  }

  function bepaalStartJaar(fallbackJaar) {
    var uitUrl = leesJaarUitUrl();
    if (uitUrl) {
      schrijfJaarNaarStorage(uitUrl);
      return uitUrl;
    }
    var uitStorage = leesJaarUitStorage();
    if (uitStorage) {
      return uitStorage;
    }
    return normaliseerJaar(fallbackJaar) || '2026';
  }

  function zetActiefJaar(jaar, opts) {
    var j = normaliseerJaar(jaar);
    if (!j) return '';
    var options = opts || {};
    if (options.persist !== false) {
      schrijfJaarNaarStorage(j);
    }
    if (options.updateUrl !== false) {
      schrijfJaarNaarUrl(j);
    }
    return j;
  }

  function voegJaarToeAanHref(href, jaar) {
    var j = normaliseerJaar(jaar);
    if (!href || !j) return href;
    if (/^(#|mailto:|tel:|javascript:)/i.test(href.trim())) return href;
    try {
      var resolved = new URL(href, global.location.href);
      if (resolved.origin !== global.location.origin) return href;
      resolved.searchParams.set('jaar', j);
      if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href.trim())) {
        return resolved.toString();
      }
      var dir = global.location.pathname.replace(/[^/]*$/, '');
      var relPath = resolved.pathname.indexOf(dir) === 0
        ? resolved.pathname.slice(dir.length)
        : resolved.pathname;
      return (relPath || href.split('?')[0].split('#')[0]) + resolved.search + resolved.hash;
    } catch (e) {
      var parts = href.split('#');
      var hash = parts.length > 1 ? '#' + parts.slice(1).join('#') : '';
      var baseAndQuery = parts[0].split('?');
      var base = baseAndQuery[0];
      var params = new URLSearchParams(baseAndQuery[1] || '');
      params.set('jaar', j);
      return base + '?' + params.toString() + hash;
    }
  }

  function werkLinksBij(jaar, rootEl) {
    var j = normaliseerJaar(jaar);
    if (!j) return;
    var root = rootEl || global.document;
    if (!root || !root.querySelectorAll) return;
    var anchors = root.querySelectorAll('a[href]');
    for (var i = 0; i < anchors.length; i++) {
      var a = anchors[i];
      if (a.getAttribute('data-no-jaar') === '1') continue;
      var rawHref = a.getAttribute('href');
      if (!rawHref) continue;
      var bijgewerkt = voegJaarToeAanHref(rawHref, j);
      if (bijgewerkt && bijgewerkt !== rawHref) {
        a.setAttribute('href', bijgewerkt);
      }
    }
  }

  function installeerTerugEnSyncListeners(onJaarGewijzigd, fallbackJaar) {
    global.addEventListener('pageshow', function () {
      var actueel = bepaalStartJaar(fallbackJaar);
      werkLinksBij(actueel);
      if (typeof onJaarGewijzigd === 'function') {
        onJaarGewijzigd(actueel, 'pageshow');
      }
    });

    global.addEventListener('storage', function (ev) {
      if (!ev || !ev.key || STORAGE_KEYS.indexOf(ev.key) !== -1) {
        var uitStorage = leesJaarUitStorage();
        var actueel = uitStorage || bepaalStartJaar(fallbackJaar);
        if (uitStorage) {
          schrijfJaarNaarUrl(uitStorage);
        }
        werkLinksBij(actueel);
        if (typeof onJaarGewijzigd === 'function') {
          onJaarGewijzigd(actueel, 'storage');
        }
      }
    });
  }

  global.NNFCJaarNav = {
    isGeldigJaar: isGeldigJaar,
    normaliseerJaar: normaliseerJaar,
    leesJaarUitUrl: leesJaarUitUrl,
    leesJaarUitStorage: leesJaarUitStorage,
    schrijfJaarNaarStorage: schrijfJaarNaarStorage,
    schrijfJaarNaarUrl: schrijfJaarNaarUrl,
    bepaalStartJaar: bepaalStartJaar,
    zetActiefJaar: zetActiefJaar,
    voegJaarToeAanHref: voegJaarToeAanHref,
    werkLinksBij: werkLinksBij,
    installeerTerugEnSyncListeners: installeerTerugEnSyncListeners
  };
})(typeof window !== 'undefined' ? window : this);
