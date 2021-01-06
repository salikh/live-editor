# Live Code Editor (Japanese fork)

**WARNING:** This is a fork of https://github.com/Khan/live-editor intended for small introductory
programming workshops in Japan.

This is the live coding environment based on the [Khan Academy Computer Programming curriculum](https://www.khanacademy.org/computer-programming/).
It gives learners an editor on the left (ACE) and an output on the right (JS+ProcessingJS).
The following modifications has been made compared to upstream project:

* A reference documentation is embedded in the static one-page app.
* Program saving and link sharing added using Firebase realtime DB.
* A button for executing a program in full-screen mode.

You can start playing immediately with the simple demo of the upstream project:

* [http://khan.github.io/live-editor/demos/simple/](http://khan.github.io/live-editor/demos/simple/)

## Running

In order to run `live-editor` locally you'll have run a local web server.  If you have python installed this can be accomplished by running the following command from the `live-editor` folder:

    python -m SimpleHTTPServer

You should see the following console output:

    Serving HTTP on 0.0.0.0 port 8000 ...

Open up a browser and navigate to http://0.0.0.0:8000/build or to http://0.0.0.0:8000/demos/simple.

## Building

**WARNING:** This project requires node ~6 and npm ~3 in order for `npm install`
to work correctly.

You can use the pre-built copies of everything inside the `build/` directory. If you wish to make some changes and re-build the library from scratch you'll need to install some dependencies:

    git submodule update --init --recursive
    npm install
    bower install

    # Build the Ace editor files (This is usually *not* needed)
    cd bower_components/ace
    npm install
    node Makefile.dryice.js -nc

At this point you can make a fresh build, using [Gulp](http://gulpjs.com/):

    npm run build

If you have an issue with "this.merge" is undefined, then `rm -rf node_modules/gulp-handlebars/node_modules/handlebars`.

## Testing

The tests are in the `/tests` folder. They use Mocha/Chai/Sinon. Gulp typically runs the tests when relevant files change, but you can explicitly run the tests with:

    npm test

You can also run single test suites at a time - see gulpfile.js for what suites are available:

    gulp test_output_pjs_assert

You can run the tests in the browser runner by opening the relevant webpage:

    open tests/output/sql/index.html

In order to run the tests that create Worker threads, you'll need to run Chrome with a flag:

    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files

Please add tests whenever possible for any change that you make or propose.

## How it works

For a deep dive into the components of the LiveEditor, [read this wiki](https://github.com/Khan/live-editor/wiki/How-the-live-editor-works).

You can also watch these talks that the team has given about the editor:
* [John Resig on CodeGenius](https://www.youtube.com/watch?v=H4sSldXv_S4)
* [Pamela Fox at ReactConf](https://youtu.be/EzHsLt9vLbk?t=26m49s)
