function parseFragment() {
  var params = {};
  var parts = window.location.hash.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    if (part == '') continue;
    var pieces = part.split('=');
    if (pieces.length == 1) {
      params[''] = decodeURIComponent(part);
      continue;
    }
    params[pieces[0]] = decodeURIComponent(pieces[1]);
  }
  return params;
}

/**
 * Update the fragment hash with a new key-value pair.
 * If value is null, removes that part from the fragment hash.
 * If key is empty string, sets the hash to that value.
 * @param {string} key
 * @param {?string} value
 */
function updateFragment(key, value) {
  var params = parseFragment();
  if (value == null) {
    delete params[key];
  } else {
    params[key] = value;
  }
  var hash = '';
  for (key in params) {
    if (hash.length > 0) {
      hash = hash + '&';
    }
    if (key != '') {
      hash = hash + encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    } else {
      hash = hash + encodeURIComponent(params[key]);
    }
  }
  window.location.hash = hash;
}
