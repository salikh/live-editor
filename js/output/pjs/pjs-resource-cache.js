function PJSResourceCache(options) {
    this.canvas = options.canvas;   // customized Processing instance
    this.output = options.output;   // LiveEditorOutput instance
    this.cache = {};
    this.imageHolder = null;

    // Insert the images into a hidden div to cause them to load
    // but not be visible to the user
    if (!this.imageHolder) {
        this.imageHolder = document.createElement("div");
        this.imageHolder.style.height = 0;
        this.imageHolder.style.width = 0;
        this.imageHolder.style.overflow = "hidden";
        this.imageHolder.style.position = "absolute";
        document.body.appendChild(this.imageHolder);
    }
}

/**
 * Load and cache all resources (images and sounds) referenced in the code.
 *
 * All resources are loaded as we don't have more details on exactly which
 * images will be required.  Execution is delayed if a getImage/getSound call
 * is encountered in the source code and none of the resources have been loaded
 * yet.  Execution begins once all the resources have loaded.
 *
 * @param {Object} resources A object whose keys are filenames
 * @returns {Promise}
 */
PJSResourceCache.prototype.cacheResources = function(resources) {
    var promises = Object.keys(resources).map((filename) => {
        return this.loadResource(filename);
    });
    return Promise.all(promises);
};

PJSResourceCache.prototype.loadResource = function(filename) {
    if (filename.endsWith(".png")) {
        return this.loadImage(filename);
    } else if (filename.endsWith(".mp3")) {
        return this.loadSound(filename);
    } else if (filename.endsWith(".ogg")) {
        return this.loadSound(filename);
    }
};

PJSResourceCache.prototype.loadImage = function(filename) {
    return new Promise((resolve) => {
        var path = this.output.imagesDir + filename;
        var img = document.createElement("img");

        img.onload = () => {
            this.cache[filename] = img;
            resolve();
        };
        img.onerror = () => {
            resolve(); // always resolve
        };

        img.src = path;
        this.imageHolder.appendChild(img);
    });
};

PJSResourceCache.prototype.loadSound = function(filename) {
    return new Promise((resolve) => {
        var audio = document.createElement("audio");
        var parts = filename.split("/");
	var basename = parts[1];
        if (basename.endsWith(".mp3")) {
	  basename = basename.replace(".mp3", "")
	}

        var group = _.findWhere(OutputSounds[0].groups, { groupName: parts[0] });
        var hasSound = group && group.sounds.includes(basename);
        if (!hasSound) {
	    window.console.error("no sound: " + filename);
            resolve();
            return;
        }

        audio.preload = "auto";
        audio.oncanplaythrough = () => {
	    window.console.log("preloaded sound ", filename);
            this.cache[filename] = {
                audio: audio,
                __id: function () {
                    return `getSound('${filename.replace(".mp3", "")}')`;
                }
            };
            resolve();
        };
        audio.onerror = () => {
            resolve();
        };

        audio.src = this.output.soundsDir + filename;
	window.console.log("preloaded sound ", filename, "src:", audio.src);
    });
};

PJSResourceCache.prototype.getResource = function(filename, type) {
    switch (type) {
        case "image":
            return this.getImage(filename);
        case "sound":
            return this.getSound(filename);
        default:
            throw "we can't load '" + type + "' resources yet";
    }
};

PJSResourceCache.prototype.getImage = function(filename) {
    var fullname = filename.endsWith(".png") ? filename : filename + ".png";
    var image = this.cache[fullname];

    if (!image) {
        throw {message:
            i18n._("Image '%(file)s' was not found.", {file: filename})};
    }

    // cache <img> instead of PImage until we investigate how caching
    // PImage instances affects loadPixels(), pixels[], updatePixels()
    var pImage = new this.canvas.PImage(image);
    pImage.__id = function() {
        return "getImage('" + filename + "')";
    };

    return pImage;
};

PJSResourceCache.prototype.getSound = function(filename) {
    var fullname = filename + ".mp3";
    if (filename.endsWith(".ogg") || filename.endsWith(".mp3")) {
      fullname = filename;
    }
    var sound = this.cache[fullname];

    if (!sound) {
        throw {message:
            i18n._("Sound '%(file)s' was not found.", {file: fullname})};
    }

    return sound;
};

/**
 * Searches for strings containing the name of any image or sound we providefor
 * users and adds them to `resources` as a key.
 *
 * @param {string} code
 * @returns {Object}
 */
PJSResourceCache.findResources = function(code) {
    let ast = esprima.parse(code, { loc: true });

    let resources = {};
    walkAST(ast, null,
        [ASTTransforms.findResources(resources)]);

    return resources;
};
