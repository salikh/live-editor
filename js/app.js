var data = {
  name: null,
  help_on: false,
  message: null,
  fullname: null,
  uid: null,
  original_code: window.localStorage["test-code"],
  original_name: null,
  original_uid: null,
  name_error: false,
};

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
  var hash = "";
  for (key in params) {
    if (hash.length > 0) {
      hash = hash + '&';
    }
    if (key != "") {
      hash = hash + encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    } else {
      hash = hash + encodeURIComponent(params[key]);
    }
  }
  window.location.hash = hash;
}

/**
 * Generates a new random id in base62.
 */
function generateBase62ID(numchars) {
  let base62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghipqrstuvwxyz";
  let ret = "";
  for (let i = 0; i < numchars; i++) {
    ret = ret + base62[Math.floor(Math.random() * base62.length)];
  }
  return ret;
}

function loadNamed(name) {
  firebase.database().ref('/shared/' + name).once('value').then(function(snapshot) {
    if (snapshot.val() === null) {
      window.console.error('did not find ' + id);
      return;
    }
    window.liveEditor.editor.text(snapshot.val().code);
    data.original_code = snapshot.val().code;
    data.original_name = name;
    data.original_uid = snapshot.val().uid;
    if (snapshot.val().uid == data.uid) {
      data.name = name;
    }
  }).catch(function(error) {
    window.console.error('could not load named program ' + name, error);
  })
}

function clearMessage() {
  Vue.set(data, 'message', null);
}

/** Stores the source code by name */
function saveNamed(name, code) {
  clearMessage();
  // Should not happen as 'Save' button is disabled in UI.
  if (firebase.auth().currentUser.uid == null) {
    window.console.error('Not logged in');
    return; 
  }
  firebase.database().ref('/shared/' + name).once('value').then(function(snapshot) {
    if (snapshot.val() != null && snapshot.val().uid != data.uid) {
      data.message = 'Name ' + name + ' is already taken';
      window.console.error('Name ' + name + ' is already taken');
      data.name_error = true;
      return;
    }
    var updates = {} 
    updates["/shared/" + name] = {
      code: code,
      time: firebase.database.ServerValue.TIMESTAMP,
      uid: firebase.auth().currentUser.uid
    };
    firebase.database().ref().update(updates).then(function(){
      updateFragment('load', null);
      updateFragment('id', null);
      updateFragment('', name);
      data.original_code = code;
      data.original_name = name;
      data.original_uid = firebase.auth().currentUser.uid;
      data.name_error = false;
      window.console.log('Saved named: ' + name);
    }).catch(function(error){
      window.console.error('Could not save ' + name, error);
      data.message = "Unable to save project: " + error;
    });
  });
}


/** Loads the source code by id */
function loadSource(id) {
  firebase.database().ref('/code/' + id ).once('value').then(function(snapshot) {
    if (snapshot.val() === null) {
      window.console.error('did not find ' + id);
      return;
    }
    window.liveEditor.editor.text(snapshot.val().code);
    data.original_code = snapshot.val().code;
  }).catch(function(error) {
    window.console.error('could not load ' + id, error);
  })
}

/** Stores the source code by id */
function saveSource(id, code) {
  var updates = {} 
  updates["/code/" + id] = {
    code: code,
    time: firebase.database.ServerValue.TIMESTAMP,
    uid: firebase.auth().currentUser && firebase.auth().currentUser.uid
  };
  firebase.database().ref().update(updates).then(function(){
    updateFragment('load', null);
    updateFragment('', null);
    updateFragment('id', id);
    data.original_code = code;
    data.original_name = null;
    data.original_uid = null;
    window.console.log('Saved ' + id);
  }).catch(function(error){
    window.console.error('could not save ' + id, error);
    data.message = "Unable to save project: " + error;
  });
}

function save() {
  let code = window.liveEditor.editor.text();
  if (code == data.original_code && (data.name == data.original_name || !data.name)) {
    window.console.log('no changes');
    return;
  }
  let params = parseFragment();
  if (data.name) {
    saveNamed(data.name, code);
  } else if ('' in params && data.original_uid == data.uid) {
    data.name = params[''];
    saveNamed(data.name, code);
  } else {
    window.console.log('original_uid', data.original_uid, 'uid', data.uid);
    let id;
    if ('id' in params) {
      id = params['id'];
    } else {
      id = generateBase62ID(5);
    }
    saveSource(id, code);
  }
}

function updateRegularly() {
  let code = window.liveEditor.editor.text();
  if (code == data.original_code && (data.name == data.original_name || !data.name)) {
    return;
  }
  save();
}

window.addEventListener('load', function() {
  window.app = new Vue({
    el: "#app",
    data: data,
    methods: {
      help: function(help_on) {
	data.help_on = help_on;
      },
      name_change: function() {
	data.name_error = false;
      },
      save: save,
      new_program: function() {
	updateFragment('id', null);
	updateFragment('load', null);
	updateFragment('', null);
	let code = 'rect(10, 20, 200, 300);'
	window.liveEditor.editor.text(code);
	data.original_code = code;
	data.original_name = null;
	data.original_uid = null;
	data.name = null;
      },
      clear_message: function() {
	data.message = null;
      },
      login: function() {
	let provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().useDeviceLanguage();
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  //var token = result.credential.accessToken;
	  // The signed-in user info.
	  window.console.log(result.user);
	  data.fullname = result.user.displayName;
	  data.uid = result.user.uid;
	  if (data.original_uid == data.uid && data.original_name) {
	    data.name = data.original_name;
	  }
	}).catch(function(error) {
	  window.console.log(error);
	  data.message = 'Error logging in: ' + error.message;
	  data.fullname = null;
	  data.uid = null;
	});

      },
      logout: function() {
	firebase.auth().signOut().then(() => {
	  data.fullname = null;
	  data.uid = null;
	}).catch((error) => {
	  window.console.log(error);
	  data.message = 'Error logging out: ' + error.message;
	  data.fullname = null;
	  data.uid = null;
	});
      },
    },
  });
  let params = parseFragment();
  if ('' in params) {
    loadNamed(params['']);
    if ('id' in params) updateFragment('id', null);
    if ('load' in params) updateFragment('load', null);
  } else if ('id' in params) {
    loadSource(params['id']);
    if ('load' in params) updateFragment('load', null);
  } else if ('load' in params) {
    loadSource(params['load']);
  }
  window.setInterval(updateRegularly, 5000);
  /*
  // TODO(salikh): Implement help on hover.
  window.liveEditor.editor.editor.on('mousemove', function(e) {
    let editor = window.liveEditor.editor.editor;
    let position = e.getDocumentPosition();
    var token = editor.session.getTokenAt(position.row, position.column);
    if (token != null) {
      window.console.log('token under mouse: ', token.value, e);
    }
    //Vue.set(data, 'message', token.value);
  });
  */
  fetch('docs.html')
    .then(response => response.text()) 
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      window.console.log(doc);
    });
})
