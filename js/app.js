var data = {
  help_on: false,
  message: null,
  name: null,
  uid: null,
  original_code: window.localStorage["test-code"],
};

function updateRegularly() {
  // TODO(salikh): Add autosave.
}

function parseFragment() {
  var params = {};
  var parts = window.location.hash.substring(1).split('&');
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];
    if (part == '') continue;
    var pieces = part.split('=');
    if (pieces.length != 2) {
      window.console.error('Invalid fragment parameter: ' + part);
      continue;
    }
    params[pieces[0]] = decodeURIComponent(pieces[1]);
  }
  return params;
}

/**
 * Update the fragment hash with a new key-value pair.
 * If value is null, removes that part from the fragment hash.
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
    hash = hash + encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
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

function saveSource(id, code) {
  var updates = {} 
  var revisionId = firebase.database().ref().child("/code/" + name).push().key
  updates["/code/" + id] = {
    code: code,
    time: firebase.database.ServerValue.TIMESTAMP,
    uid: firebase.auth().currentUser && firebase.auth().currentUser.uid
  };
  firebase.database().ref().update(updates).then(function(){
    updateFragment('load', null);
    updateFragment('id', id);
    data.original_code = code;
    window.console.log('saved ' + id);
  }).catch(function(error){
    window.console.error('could not save ' + id, error);
    data.message = "Unable to save project: " + error;
  });
}

window.addEventListener('load', function() {
  window.app = new Vue({
    el: "#app",
    data: data,
    methods: {
      help: function(help_on) {
	data.help_on = help_on;
      },
      save: function() {
        let code = window.liveEditor.editor.text();
	if (code == data.original_code) {
	  window.console.log('no changes');
	  return;
	}
	let params = parseFragment();
	let id;
	if ('id' in params) {
	  id = params['id'];
	} else {
	  id = generateBase62ID(5);
	  updateFragment('id', id);
	}
	saveSource(id, code);
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
	  data.name = result.user.displayName;
	  data.uid = result.user.uid;
	}).catch(function(error) {
	  window.console.log(error);
	  data.message = 'Error logging in: ' + error.message;
	  data.name = null;
	  data.uid = null;
	});

      },
      logout: function() {
	firebase.auth().signOut().then(() => {
	  data.name = null;
	  data.uid = null;
	}).catch((error) => {
	  window.console.log(error);
	  data.message = 'Error logging out: ' + error.message;
	  data.name = null;
	  data.uid = null;
	});
      },
    },
  });
  let params = parseFragment();
  if ('id' in params) {
    loadSource(params['id']);
  } else if ('load' in params) {
    loadSource(params['id']);
  }
  window.setInterval(updateRegularly, 5000);
})
