# Compiling Angular applications, development and production

There are various options to consider in compiling/building Angular
applications, both for development and production. Here is a short
summary of the state-of-the-art as of March 2017.

## Angular CLI

We work with this extensively during Angular Boot Camp.

[CLI web site](https://cli.angular.io/)

[CLI on Github](https://github.com/angular/angular-cli)

Angular CLI is best choice to start with, because...

* Endorsed by the Angular team.
* Developed partly by the Angular team, along with outside
  contributors.
* Supports AOT easily.
* Many features, ready immediately when you need them.
* Performance is quite good.
* Output bundles are small, as small as easily achievable.
* Keeping it up to date is Someone Else's Problem - this is perhaps
  the most important feature.

Behind the scenes, Angular CLI is based on webpack and various related
libraries and Angular-specific plugins.

## Webpack (without CLI)

Behind the scenes, Angular CLI is built on webpack. CLI offers a
convenient `ng eject` feature which will convert your CLI-based
project to a webpack-based project. (Though there is an important
caveat: that project will still depend on an important piece of CLI
which arrives as a web pack plug-in.)

* Long, proven history - although for good results you need webpack 2,
  which does not yet have a long or proven history.
* AOT support, with the above-mentioned Angular-specific plugin.
* Numerous plugins and addons.
* Can be slow in development, although many iterations of work have
  made betterr.
* Tendency to end up with a long, complex config file; but there are
  now tools to help manage web pet configuration complexity.

## Rollup

Rollup is receiving lots of attention as a particularly efficient
module bundler, and in fact it does sometimes produce meaningfully
smaller distributable Angular programs then CLI/webpack, though at the
cost of more project specific configuration work.

It can be used in combination with various tools or alone. You can see
a couple of examples that we have published online:

[Angular 4 AOT Example with es2015 ESM, Rollup, Buble, Uglify](https://github.com/OasisDigital/angular-aot-es2015-rollup)

[Another variation, AOT + Rollup + Closure](https://github.com/OasisDigital/angular-aot-es2015-rollup/tree/closure-compiler)

As of early 2018, Rollup now has code splitting capability; soon it
should be possible to implement Angular lazy loading easily with
Rollup behind the scenes.

## AOT + Closure Compiler

This is the Angular build stack "of the future". Something close to it
is used by Angular calipers at Google, for example.

Closure Compiler is a JavaScript bundler and compressor that can work
in a more advanced level than most (or possibly all) of the
competition. But to do that it can impose more strict requirements on
the code passed to it.

Angular itself has had many enhancements internally to make
it more compatible with Closure Compiler, and the requirements for
application code for the stack are still emerging.

You can see this working in the following repo we have published:

[AOT and Closure Compiler Example](https://github.com/OasisDigital/angular-aot-closure)

However, because of the JavaScript/TypeScript additional coding
requirements imposed by Closure, we believe that in the foreseeable
future it will only be of importance to projects where the absolute
smallest possible output size is vital.

## SystemJS + Typescript (in-browser)

It is possible to run Angular applications directly in the browser,
with the help of tooling that runs in browser. In fact, this is what
we do while teaching Angular Boot Camp most of the way through.

Early in the development of Angular, this is a very useful approach;
and still is today, for contexts like this class. However, it should
be considered obsolete for "real" use.

## Other tools

There are also numerous other and older tools that could plausibly use
to build a Angular application. We list these for completeness, but
generally recommend the solutions listed much earlier above, in
particular CLI.

* Browserify
* Require.js
* JSPM
* Many more
