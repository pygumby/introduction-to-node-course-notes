> ### 🚨 My GitHub account name and domain have changed since I created this repository!
> **When I originally created this repository, my GitHub account was `@lambdarookie` and my domain was `lambdarookie.com`.
> These might be referenced within this repository.
> Note that my current GitHub account is `@pygumby` and my current domain is `pygumby.com`.**

# introduction-to-node-course-notes

**Notes on and source code from the Egghead course "Introduction to Node: The Fundamentals" by Will Button**

---

* The contents of this repository are originally based on the Egghead course [Introduction to Node: The Fundamentals](https://egghead.io/courses/introduction-to-node-the-fundamentals) by Will Button ([willbutton.co](https://willbutton.co)).
  This repository only represents a fraction of what is to be found within the course.
  Also, this repository contains many additions and comments that are not part of the course.

---

1. [Usage](#1-usage)
2. [Progress](#2-progress)
3. [Notes](#3-notes)
   1. [`01-use-the-node-js-repl-shell`](#1-01-use-the-node-js-repl-shell)
   2. [`02-understand-callbacks-in-node-js`](#2-02-understand-callbacks-in-node-js)
   3. [`03-understand-the-node-js-process-object`](#3-03-understand-the-node-js-process-object)
   4. [`04-understand-node-js-buffers`](#4-04-understand-node-js-buffers)
   5. [`05-understand-global-namespace-in-node-js`](#5-05-understand-global-namespace-in-node-js)
   6. [`06-create-a-simple-node-js-module`](#6-06-create-a-simple-node-js-module)
   7. [`07-export-modules-in-node-js`](#7-07-export-modules-in-node-js)
   8. [`08-install-packages-in-a-node-js-application-using-npm`](#8-08-install-packages-in-a-node-js-application-using-npm)
   9. [`09-create-a-tcp-server-using-the-node-js-net-module`](#9-09-create-a-tcp-server-using-the-node-js-net-module)
   10. [`10-publish-and-share-a-node-js-module`](#10-10-publish-and-share-a-node-js-module)
   11. [`11-build-a-simple-http-server-with-node-js`](#11-11-build-a-simple-http-server-with-node-js)
   12. [`12-publish-a-module-to-the-npm-registry`](#12-12-publish-a-module-to-the-npm-registry)
   13. [`13-add-and-remove-eventemitters-in-node-js`](#13-13-add-and-remove-eventemitters-in-node-js)
   14. [`14-manage-memory-and-garbage-collection-in-node-js`](#14-14-manage-memory-and-garbage-collection-in-node-js)

---

## 1. Usage

This repository contains some source code.
Its usage is explained at throughout my course notes.

## 2. Progress

I followed along the entire course and took notes for every lesson.
Read them below.

## 3. Notes

### 1. `01-use-the-node-js-repl-shell`

* The REPL can be started in the console simply by running the `node` command.
* The expression of assigning a variable returns `undefined`.
* The underscore character `_` accesses the result of the last operation:
  ```js
  // REPL:
  > 1 + 2 + 3
  6
  > _ + 4
  10
  ```
* Functions can be defined, even multi-line functions.
* If you made a mistake, `ctrl + c` as well as typing `.break` and `.clear` kick you out of the current context and return you to the prompt.
* `.save <filename.js>` will save the session to a file, `.load <filename.js>` will restore it from said file.
* There is the `.help` command.

### 2. `02-understand-callbacks-in-node-js`

* All that a callback is, is an argument to a function, that is a function itself.
  ```js
  // REPL:
  > var welcome = function() {
  ... console.log("Welcome!");
  ... };
  undefined
  > var call = function(callback) {
  ... callback()
  ... };
  undefined
  > call(welcome);
  Welcome!
  undefined
  ```
* Why would you do that? It's how Node is able to operate asynchronously.
* It also gives us the ability to group our code logically as well as to re-use generic functions:
  ```js
  // REPL:
  > var walk = function(dir) {
  ... if (dir === 'west') { console.log("There is a mailbox here."); }
  ... if (dir === 'east') { console.log("There is a deep chasm here."); }
  ... };
  undefined
  > var callWithArg = function(callback, argument) {
  ... callback(argument);
  ... };
  undefined
  > callWithArg(walk, 'west');
  There is a mailbox here.
  undefined
  ```

### 3. `03-understand-the-node-js-process-object`

* The global object `global.process` exposes many of the functions and properties that reveal information about the process running your instance of Node.
* In the REPL, try out:
  * `global.process`
  * `global.process.version`
  * `global.process.versions`
* How to log arguments to the console using `process.argv`:
  ```js
  // arguments.js:
  process.argv.forEach(function(val, index) {
    console.log(index + ': ' + val);
  });
  ```
  ```console
  // Console:
  $ node arguments.js hello world
  0: node
  1: path/to/arguments.js
  2: hello
  3: world
  ```
* A demonstration of Node's event loop using `process.nextTick`:
  ```js
  // next-tick.js:
  console.log('start');
  process.nextTick(function() {
    console.log('nextTick callback')
  });
  console.log('end');
  ```
  ```console
  // Console:
  $ node next-tick.js
  start
  end
  nextTick callback
  ```
* Node is an event loop processor, i.e., it runs in a loop looking for events it can pick up and execute.
  First time through, `nextTick` just indicates that next time through, the callback needs to be executed.

### 4. `04-understand-node-js-buffers`

* File system operations or a TCP streams represent octet streams, which JavaScript can't natively deal with.
  Such raw data is stored in an instance of the `Buffer` class, which is similar to an array of integers but actually corresponds to raw memory outside of the V8 engine.
  ```
  // foo.txt:
  Some `foo`...
  ```
  ```js
  // REPL:
  > fs.readFile('foo.txt', function(err, data) {
  ... console.log(data);
  ... });
  undefined
  > <Buffer 53 6f 6d 65 20 60 66 6f 6f 60 2e 2e 2e 0a 0a>
* To actually log the text from the file to console, you can
  * replace `console.log(data);` with `console.log(data.toString);` or
  * replace `fs.readFile('foo.txt', function(err, data)` with `fs.readFile('foo.txt', 'utf8' function(err, data)`, i.e., specify encoding.
* Given a String `str`, `str.length` and `Buffer.byteLength(str, 'utf8')` do not necessarily evaluate to the same result.
  E.g., `str` might contain *one* character that is represented by *two* bytes.
  (ASCII characters each have a byte length of 1, though.)
* Byte length is important when writing to buffers:
  ```js
  // REPL:
  > buf = new Buffer(5)
  <Buffer 00 00 00 00 00>
  > buf.write('Hello, world.');
  5 // Only 5 bytes written...
  > buf.toString();
  'Hello' // ...which correspond to the first five chars of the String.
  ```
* `Buffer` instances come with the methods `compare` (comparing values) and `equals` (comparing identities).

### 5. `05-understand-global-namespace-in-node-js`

* "Globals" are objects that are available to all Node applications without having to `require` anything.
* If you define `var foo;`, it is going to be global inside the application module (but not to all of Node, obviously).
  ```js
  // REPL:
  > var foo = 'bar';
  undefined
  > global
  Object [global] {
    // snip
    foo: 'bar'
  }
  ```
* The key takeaway point of the following example is that while we declare `globalFoo` globally within `global.js`, it will not be global in the REPL session where we `require` the file `global.js`.
  (By using `exports`, we make the getter/setter functions available to any application that includes `global.js`.)
  ```js
  // global.js:
  var globalFoo;
  exports.setFoo = function(val) {
    globalFoo = val;
  };
  exports.getFoo = function() {
    return globalFoo;
  };
  ```
  ```js
  // REPL:
  > var modFoo = require('./global.js');
  undefined
  > modFoo.setFoo(42);
  undefined
  > modFoo.getFoo();
  42
  > global
  Object [global] {
    // snip
    modFoo: { setFoo: [Function], getFoo: [Function] } // No globalFoo here!
  }
  ```

### 6. `06-create-a-simple-node-js-module`

* Node's modules concept allows you
  * to add functionality written by others to your application, and
  * to refactor your own code for readability and usability.
* There are several different ways the `require` object can grab modules:
  * In the last section, we specified a relative path to the file we wanted to include using `require('./global.js')`.
  * A locally installed module, e.g., the module `colors`, previously installed by running `npm install colors`, can be included via `require('colors')`.
  * You can also include globally available Node modules that exist within Node's core.
    E.g., the `http` module can be included simply by doing `require('http')`.
    (You can also globally install packages using `npm install -g package-name`.)
* When you `require` modules, Node follows a hierarchy in order to determine which one to include:
  * It looks at the global modules first.
    If it finds one, that's the one it's going to use, even if you have a local module by that same name.
  * If it doesn't find a global module by that name, it's going to look in the local `node_modules` folder.
  * If it doesn't find it there, it's going to start directory traversal.
    (As far as I understand, Node is essentially going to work its way up to the root by repeatedly doing `cd ..` and then look for/into a `node_modules` folder.)
 * Earlier, we could have done `require('./global')`, i.e., dropped the`.js` extension. 
   Generally, Node would look for a file `global.js`, then `global.json`, then `global.node` (compiled module).

### 7. `07-export-modules-in-node-js`

* An easy way to think about exporting modules is to think of it as a way to expose your functions so they can be used elsewhere.
* You can either do this
  * by exporting individual functions or
  * by exporting the entire file.
* Exporting individual functions has already been demonstrated in section 05.
* Using the second approach looks like this:
  ```js
  // module-exports.js:
  var PI = Math.PI;
  module.exports = function(r) {
    return {
      area: function() {
        return PI * r * r;
      },
      circumference: function() {
        return 2 * PI * r;
      }
    };
  };
  ```
  ```js
  // REPL:
  > var m = require('./module-exports');
  undefined
  > var circle = m(4);
  undefined
  > circle.area();
  50.26548245743669
  ```
* The difference between `exports` and `module.exports` is often explained poorly.
  This is also the case here, sadly.
  There best explanation is this one:
  https://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js/18178696#18178696

### 8. `08-install-packages-in-a-node-js-application-using-npm`

* npm is the default package manager for Node.
  You can search and find modules using the npm's web site, https://npmjs.com.
* Generally, to install a module, e.g., `colors`, using npm, you would do `npm install colors`.
* When installing a module using npm, a big source of confusion is whether or not to include the `-g` flag.
  * If you do `npm install` without `-g`, the module is going to get installed within the local `node_modules` directory of your application.
    Do so if you're going to include the package using a `require` statement in your application.
  * The `-g` flag is going to install the package globally.
    Do so if you're going to be using the package from the command line.
* There are the flags `--save` and `--save-dev`:
  * When installing a package, using the flag `--save` will cause the package to be listed as a dependency within the file `node_modules/package.json`:
    ```js
    // node_modules/package.json:
    {
      // snip
      "dependencies": {
        "colors": "^1.3.3"
      }
    }
    ```
  * Using `--save-dev ` results in the package being listed as a development dependency:
    ```js
    // node_modules/package.json:
    {
      // snip
      "devDependencies": {
        "mocha": "^6.1.4"
      }
    }
    ```
* The caret character `^` in front of the version numbers is a wildcard matching the minor version level.
  (If necessary, read about [semantic versioning](https://semver.org/).)
  The tilde character `~` is a wildcard matching the patch version level.
  Using asterisk `*` instead of specifying a version will result in the newest version to be installed.
  It's going to cause you grief and heartache.

### 9. `09-create-a-tcp-server-using-the-node-js-net-module`

* Just now, I noticed that the course is using a lot of example code from the [official Node docs](https://nodejs.org/api/).
  So I searched the docs for the code that was presented in this section and even found a newer version of it.
  I modified it, and there you go -- [a TCP server based on the Node module `net`](tcp-server/index.js).
* You can test the server by doing `node tcp-server/index.js` in one terminal, and then `telnet localhost 8124` in another.
  The code is self-explanatory, and even if it weren't -- the link to the specific page from the Node docs is provided in the file.

### 10. `10-publish-and-share-a-node-js-module`

* In this section, we created the module console-log-hello-npm (originally say-hello-world, but I had to rename it in order to publish it on npm, since the original name was taken).
  It can be used to log "Hello, npm." to the console.
* After we created the directory [console-log-hello-npm](console-log-hello-npm), we `cd`'d into it and ran `npm init`.
  In the following prompt, we chose [index.js](console-log-hello-npm/index.js) to be the entry point of the module.
  Thus, this we created this file and populated it with the game-changing code that this module is.
* Inside the directory [console-log-hello-npm](console-log-hello-npm), there is another file called [index.js](console-log-hello-npm-demo/index.js).
  In order to test the module console-log-hello-npm, you need to navigate into the latter directory and first run `npm install ../console-log-hello-npm`, then `node index.js`.

### 11. `11-build-a-simple-http-server-with-node-js`

* Like in section 09, I think it is more sensible to first take a look at a [very similar yet up-to-date tutorial from nodejs.org](https://nodejs.org/en/docs/guides/getting-started-guide/) and then continue with the [HTTP section of the official Node docs](https://nodejs.org/dist/latest/docs/api/http.html).

### 12. `12-publish-a-module-to-the-npm-registry`

* There are two requirements that must be met in order to publish a module to npm:
  * The module has to have a name.
  * The module has to have a version number specified.
* Since I already have a [npm account](https://npmjs.com/~lambdarookie), I just did `npm login`.
  Then I `cd`'d into the directory [console-log-hello-npm](console-log-hello-npm) and did `npm publish`.
  That's it, you can verify that it's published [here](https://www.npmjs.com/package/console-log-hello-npm).
  Note that the module can now be installed simply by doing `npm install console-log-hello-npm`.
* I could remove it from npm doing `npm unpublish console-log-hello-npm --force`.

### 13. `13-add-and-remove-eventemitters-in-node-js`

* For brevity, I compiled the following piece of self-explanatory code to summarize this section:
  ```js
  // events.js:
  var EventEmitter = require('events').EventEmitter;
  
  var sayHello = function() { console.log("Hello, world."); };
  var sayGoodbye = function() { console.log("Goodbye, world."); }
  
  emitter = new EventEmitter();
  
  emitter.on('hello', sayHello);
  emitter.on('goodbye', sayGoodbye);
  
  emitter.emit('hello'); // Logs "Hello, world." to the console
  emitter.emit('goodbye'); // Logs "Goodbye, world." to the console
  
  console.log(global.emitter._events);
  // Logs the following to the console:
  // [Object: null prototype] {
  //   hello: [Function: sayHello],
  //   goodbye: [Function: sayGoodbye]
  // }
  
  console.log(global.emitter._events.hello.toString());
  // Logs the following to the console:
  // function() { console.log("Hello, world."); }
  
  emitter.removeListener('hello', sayHello);
  console.log(global.emitter._events);
  // Logs the following to the console:
  // [Object: null prototype] { goodbye: [Function: sayGoodbye] }
  
  console.log(emitter.emit('hello')); // Logs false to the console
  ```
* It is noteworthy that when doing `var server = http.createServer();`, `server` is really an `EventEmitter`.

### 14. `14-manage-memory-and-garbage-collection-in-node-js`

* This section introduces Node's memory management as well as its garbage collector.
  I find this material to be fairly unsuitable for a textual summary, so I recommend to just watch it.
