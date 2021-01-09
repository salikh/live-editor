var data = {
  name: null,
  // Currently shown modal window: help|my-projects|share
  modal: null,
  help_page: 'ref-help',
  message: null,
  // The current program link to share,
  link: null,
  // This user ID.
  uid: localStorage["uid"],
  // The original code to skip saving if there were no changes.
  original_code: '// Loading...',
  // The original name of the program.
  original_name: null,
  // The uid of the owner of the script.
  original_owner: null,
  // The dictionary of reference documentation.
  ref: {},
  // The list of projects to show in My Projects modal.
  projects: [],
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

function clearMessage() {
  Vue.set(data, 'message', null);
}

/** Loads the given source code text */
function loadCode(code) {
  window.liveEditor.editor.text(code);
  // Avoid autosaving unless there were changes.
  data.original_code = code;
  data.original_owner = data.uid;
  let m = code.match(/^\/\/ *([a-zA-Z0-9_.-]*)/);
  window.console.log(m);
  if (m != null) {
    // Pick the program name from the first comment.
    data.name = m[1];
    data.original_name = data.name;
    document.title = data.name;
  }
  // Forget the previous program id.
  updateFragment('', null);
  data.link = null;
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
    data.original_owner = snapshot.val().uid;
    data.original_name = snapshot.val().name;
    data.name = data.original_name;
    document.title = data.name;
  }).catch(function(error) {
    window.console.error('could not load ' + id, error);
  })
}

/** Generates a link for the current program to share. */
function getLink(id) {
  return (document.location.protocol + '//' +
          document.location.host +
	  document.location.pathname +
	  "#" + id);
}

/** Stores the source code by id */
function saveSource(id, name, code, callback = null) {
  var updates = {} 
  updates["/code/" + id] = {
    code: code,
    time: firebase.database.ServerValue.TIMESTAMP,
    uid: data.uid,
    name: name,
  };
  firebase.database().ref().update(updates).then(function(){
    updateFragment('', id);
    data.original_code = code;
    data.original_name = name;
    data.original_owner = data.uid;
    data.link = getLink(id);
    window.console.log('Saved ' + id);
    if (callback) {
      callback();
    }
    document.title = name;
  }).catch(function(error){
    window.console.error('could not save ' + id, error);
    data.message = "Unable to save project: " + error;
    data.link = null;
  });
}

function save() {
  let code = window.liveEditor.editor.text();
  if (code == data.original_code && data.name == data.original_name) {
    // If called by the button, report no changes too.
    window.console.log('no changes');
    return;
  }
  let params = parseFragment();
  let id;
  if ('' in params && data.original_owner == data.uid) {
    // Reuse program id if it exists and we are the original owner.
    id = params[''];
  } else {
    // Otherwise generate a new ID:
    // - either id did not exist (new program),
    // - or we were not the owner, so need to fork.
    id = generateBase62ID(5);
  }
  saveSource(id, data.name, code);
}

function saveRegularly() {
  let code = window.liveEditor.editor.text();
  if (code == data.original_code && data.name == data.original_name) {
    // No spamming log when invoked automatically by timer.
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
      '<link rel="stylesheet" href="css/live-editor.output.css">'+
      '<body style="height: 100%; margin: 0; overflow: hidden;">'+
      '<div id="live-editor-output"></div>'+
      '<script src="js/live-editor.core_deps.js"></script>'+
      '<script src="js/live-editor.shared.js"></script>'+
      '<script src="js/live-editor.output_pjs_deps.js"></script>'+
      '<script src="js/live-editor.output.js"></script>'+
      '<script src="js/live-editor.output_pjs.js"></script>'+
      '<script>'+
      'var code = '+JSON.stringify(source)+';'+
      'window.liveEditorOutput = new LiveEditorOutput({'+
      '  el: $("#live-editor-output")[0],'+
      '  outputType: "pjs",'+
      '  noLint: true,'+
      '  code: code,'+
      '  width: 400,'+
      '  height: 400,'+
      '  autoFocus: true,'+
      '  workersDir: "workers/",'+
      '  externalsDir: "external/",'+
      '  imagesDir: "images/",'+
      '  soundsDir: "../../sounds/",'+
      '  execFile: "output.html",'+
      '  jshintFile: "external/jshint/jshint.js",'+
      '  newErrorExperience: true,'+
      '});'+
      'window.liveEditorOutput.firstLint = true;'+
      'window.liveEditorOutput.runCode(code);'+
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

function isVisible(e) {
  const {display, visibility} = window.getComputedStyle(e);
  return (display != 'none' && visibility != 'hidden');
}

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    window.console.log("binding", binding);
    window.console.log("vnode", vnode);
    if (typeof binding.value !== 'function') {
      let detail = '';
      if (vnode.context.name) {
	detail = `. Found in component ${vnode.context.name}`;
      }
      console.warn(`v-click-outside: provided expression '${binding.expression}' is not a function, but a ${typeof binding.value}${detail}`);
    }
    el.clickOutsideEvent = function (event) {
      window.console.log(event.target);
      // Check that click is outside of element el, and is not a button.
      if (isVisible(el) && event.target.tagName != "BUTTON" &&
	event.target.tagName != "A" &&
	!(el == event.target || el.contains(event.target))) {
	binding.value(event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
    document.body.addEventListener('touchstart', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
    document.body.removeEventListener('touchstart', el.clickOutsideEvent)
  },
});

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

// Reloads the list of projects belonging to this user.
function updateProjects() {
    firebase.database().ref('/code').orderByChild('time').on('value', function(snapshot) {
      data.projects = [];
      snapshot.forEach(function(child) {
	if (child.val().uid == data.uid) {
	  data.projects.push({
	    id: child.key,
	    name: child.val().name,
	  });
	  //window.console.log(child.key);
	  //window.console.log(child.val());
	}
      });
    });
}

window.addEventListener('load', function() {
  window.data = data;
  if (localStorage["uid"] === undefined || localStorage["uid"] === null) {
    // Generate a random user id and store it in localStorage.
    let uid = generateBase62ID(4);
    localStorage["uid"] = uid;
    data.uid = uid;
  }
  window.app = new Vue({
    el: "#app",
    data: data,
    methods: {
      setModal: function(val) {
	if (val == "my-projects") {
	  updateProjects();
	} else if (val == "share") {
	  // Make sure the project is saved (and thus data.link is filled).
	  let params = parseFragment();
	  if (!'' in params || !params['']) {
	    // Save with a new id, even if the code is unchanged.
	    let id = generateBase62ID(5);
	    saveSource(id, data.name, code, function() {
	      data.link = getLink(id);
	    });
	  }
	}
	Vue.set(data, 'modal', val); 
      },
      dismiss_share_project: function() {
	if (data.modal == 'share') {
	  window.console.log('dismiss share');
	  data.modal = null;
	}
      },
      dismiss_my_projects: function() {
	if (data.modal == 'my-projects') {
	  window.console.log('dismiss my-projects');
	  data.modal = null;
	}
      },
      dismiss_help: function() {
	if (data.modal == 'help') {
	  window.console.log('dismiss help');
	  data.modal = null;
	}
      },
      selectAndCopy: function(target) {
	target.select();
	document.execCommand('copy');
      },
      save: save,
      load: function(id) {
	loadSource(id);
	updateFragment('', id);
	data.link = getLink(id);
	data.modal = null;
      },
      new_program: function() {
	window.open('#', '_blank');
	/*
	updateFragment('', null);
	data.link = getLink(id);
	let code = 'rect(10, 20, 100, 100);'
	window.liveEditor.editor.text(code);
	data.original_code = code;
	data.original_name = '';
	data.name = '';
	document.title = 'Processing.js';
	data.original_owner = data.uid;
	*/
      },
      clear_message: function() {
	data.message = null;
      },
      fullscreen: function() {
	let fragment;
	let params = parseFragment();
	if ('' in params) {
	  // The program is already saved.
	  let fragment = '#' + params[''];
	  let win = window.open('play.html' + fragment, '_blank');
	  win.focus();
	} else {
	  // Save with a new id, even if the code is unchanged.
	  let id = generateBase62ID(5);
	  saveSource(id, data.name, code, function() {
	    let win = window.open('play.html#' + id, '_blank');
	    win.focus();
	  });
	}
      },
    },
  });
  // Convetion:
  // '' => program id (e.g. #abc12)
  // 'help' => last viewed help page (e.g. #help=help)
  let params = parseFragment();
  if ('' in params) {
    loadSource(params['']);
    data.link = getLink(params['']);
  } else {
    loadCode('// Rect\nrect(10,10,100,100);');
  }
  if ('help' in params) {
    data.help_page = 'ref-' + params['help'];
  }
  window.setInterval(saveRegularly, 5000);
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
	      loadCode(source);
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
    if (e.key === 'Escape' && data.modal != null) {
      e.preventDefault();
      Vue.set(data, 'modal', null);
    } else if (keyCode == 112) {
      e.preventDefault();
      Vue.set(data, 'modal', 'help');
    }
  });
})
