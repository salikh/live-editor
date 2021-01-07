var data = {
  name: null,
  help_on: false,
  help_page: 'ref-help',
  message: null,
  fullname: null,
  uid: null,
  original_code: 'rect(10, 20, 100, 100);',
  original_name: null,
  original_uid: null,
  name_error: false,
  ref: {},
};

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
      window.console.error('did not find ' + name);
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

function addProcessingIframes($el) {
  $($el).find('code.language-prerender, code.language-render').
      each(function(i, code) {
    //console.log(code);
    var pre = code.parentNode;
    if ($(code).hasClass('language-prerender')) {
      $(pre).addClass('prerender');
    } else {
      $(pre).addClass('render');
    }
    var source = ($(code).text());
    //code[0].style.border = 'solid 2px red';
    $(pre).find('iframe').remove();
    // Add a fresh iframe.
    var iframe = (document.createElement("iframe"));
    // Create the iframe HTML.
    var iframeHtml = '<!DOCTYPE html>\n' +
      '<body style="height: 100%; margin: 0; overflow: hidden;">'+
      '<canvas id="pjs"></canvas>'+
      '<script src="js/live-editor.core_deps.js"></script>'+
      '<script src="js/live-editor.shared.js"></script>'+
      '<script src="js/live-editor.output_pjs_deps.js"></script>'+
      '<script>'+
      'var sketchProc = function(processingInstance) { with(processingInstance) {'+
      source+
      '}};'+
      'var canvas = document.getElementById("pjs");'+
      'var processingInstance = new Processing(canvas, sketchProc);'+
      'processingInstance.loop();'+
      '</script>'+
      '</body>';
    pre.appendChild(iframe);
    if ($(code).hasClass('language-render')) {
      // Hide the code for code blocks marked with 'render'.
      $(code).hide();
    }
    var contentWindow = /** @type {!Window} */(iframe.contentWindow);
    contentWindow.document.open();
    contentWindow.document.write(iframeHtml);
    contentWindow.document.close();
    var m = source.match(/[\r\n \t]*size[ \t]*\([ \t]*([0-9]+)[ \t]*,[ \t]*([0-9]+)[, \t]/);
    if (m) {
      iframe.style.height = '' + m[2] + 'px';
      iframe.style.width = '' + m[1] + 'px';
      $(pre).css('min-height', '' + (parseInt(m[2], 10) + 16) + 'px');
    } else {
      iframe.style.height = '100px';
      iframe.style.width = '100px';
      $(pre).css('min-height', '116px');
    }
    iframe.style.borderStyle = 'solid';
    console.log("created a prerender iframe");
  });
}

function resetHiddenSnippets($el) {
  $($el).find('pre').each(function(index, preElt) {
    let code = $(preElt).find('code.language-hidden');
    if (code.length == 1) {
      let $buttons = $(preElt).find('button');
      let showButton = $buttons[0];
      let loadButton = $buttons[1];
      $(showButton).show();
      $(loadButton).hide();
      $(code).hide();
      $(showButton).off("click");
      $(showButton).click(function(ev) {
	$(showButton).hide();
	$(code).show();
	$(loadButton).show();
      });
    }
  });
}

Vue.component('help-div', Vue.extend({
  data: data,
  mounted() {
    let div;
    if (data.help_page in data.ref) {
      div = data.ref[data.help_page];
    } else {
      div = data.ref['ref-help'];
    }
    this.$el.appendChild(div);
    let $el = this.$el;
    // Vue component is recreated at each render, so the jquery manipulations
    // should be set up at component DOM creation.
    let clickHandler = function(e) {
      const href = e.target.getAttribute('href');
      if (href.match('^#ref-(.*)')) {
	e.preventDefault();
	let ref = href.substr(1);
	Vue.set(data, 'help_page', ref);
	updateFragment('help', ref.substr(4));
	window.console.log(ref);
	let div;
	if (ref in data.ref) {
	  div = data.ref[ref];
	} else {
	  div = data.ref['ref-help'];
	}
	let prev = $el.lastChild;
	if (div != prev)  {
	  $el.removeChild(prev);
	  $el.appendChild(div);
	  $($el).find('a').off("click");
	  $($el).find('a').click(clickHandler);
	  addProcessingIframes($el);
	  resetHiddenSnippets($el);
	}
      }
    }
    // Reset the link click handlers.
    $($el).find('a').off("click");
    $($el).find('a').click(clickHandler);
    // Reset the hide/show handler.
    resetHiddenSnippets($el);
    // Add rendered iframes.
    addProcessingIframes($el);
  },
  template: '<div id="help-div"><a href="#ref-help">Top</a> <a href="#ref-index">Index</a> <a href="docs.html" target="_blank">One-page</a></div>',
}));

window.addEventListener('load', function() {
  window.data = data;
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
	window.open('#', '_blank');
	/*
	updateFragment('id', null);
	updateFragment('load', null);
	updateFragment('', null);
	let code = 'rect(10, 20, 100, 100);'
	window.liveEditor.editor.text(code);
	data.original_code = code;
	data.original_name = null;
	data.original_uid = null;
	data.name = null;
	*/
      },
      clear_message: function() {
	data.message = null;
      },
      fullscreen: function() {
	let fragment;
	let params = parseFragment();
	if (data.name) {
	  fragment = '#' + data.name;
	} else if ('' in params) {
	  fragment = '#' + params[''];
	} else if ('id' in params) {
	  fragment = '#id=' + params['id'];
	} else if ('load' in params) {
	  fragment = '#id=' + params['load'];
	} else {
	  // Save with a new id.
	  id = generateBase62ID(5);
	  saveSource(id, code);
	  fragment = '#id=' + id;
	}
	let win = window.open('play.html' + fragment, '_blank');
	win.focus();
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
  if ('help' in params) {
    data.help_page = 'ref-' + params['help'];
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
  // Load the documentation.
  fetch('docs.html')
    .then(response => response.text()) 
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      //window.console.log(doc);
      const refElements = $(doc).find('div.section');
      for (let i = 0; i < refElements.length; i++) {
	const refElt = refElements[i];
	data.ref[refElt.id] = refElt;
	// Add code loading button.
	$(refElt).find('pre').each(function(index, elt) {
	  let code = $(elt).find('code.language-example, code.language-prerender, code.language-hidden');
	  if (code.length == 1) {
	    let source = code.text();
	    var button = document.createElement("button");
	    $(button).text('読み込む');
	    $(button).click(function(ev) {
	      ev.preventDefault();
	      window.liveEditor.editor.text(source);
	      // Avoid autosaving unless there were changes.
	      data.original_code = source;
	      // Forget the previous program id.
	      updateFragment('id', null);
	      updateFragment('load', null);
	      updateFragment('', null);
	    });
	    $(elt).prepend($('<br>'));
	    $(elt).prepend(button);
	  }
	  if ($(code).hasClass('language-hidden')) {
	    // Add show button to the parent <pre>.
	    var $loadButton = $(elt).find('button');
	    var button = document.createElement('button');
	    $(button).text('表示');
	    $(button).click(function(ev) {
	      $(button).hide();
	      $(code).show();
	      $loadButton.show();
	    });
	    $(elt).prepend(button);
	  }
	});
      }
      window.console.log('Loaded ' + Object.keys(data.ref).length + ' help articles.');
    });
  // Dismiss help on 'Esc' key.
  document.addEventListener('keydown', function(e) {
    let keyCode = e.keyCode || e.which;
    if (e.key === 'Escape' && data.help_on) {
      e.preventDefault();
      Vue.set(data, 'help_on', false);
    } else if (keyCode == 112 && !data.help_on) {
      e.preventDefault();
      Vue.set(data, 'help_on', true);
    }
  });
})
