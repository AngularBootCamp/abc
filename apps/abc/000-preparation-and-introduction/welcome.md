# Welcome to Angular Boot Camp

## Agenda

The agenda varies over time; your instructor will adjust it to match
the needs of the class and the ongoing changes in the Angular
ecosystem. Here is a rough idea of the overall agenda:

* Basics of Angular - core vocabulary to build components
* Structuring an Angular application
* Development / build tooling (Angular CLI)
* Advanced and varied features (that are okay to learn later)
* Examples, details, surrounding ecosystem

## Workshops

The instructor may have changes to the workshops, as our curriculum is
under continuous improvement and is adjusted for the needs of each
class.

## Online development with StackBlitz

StackBlitz is a browser-based IDE, suitable for developing Angular
code entirely online. This tool makes it very easy to get started with
an application, create components, services, etc. It is especially
amenable to getting up and running quickly to work on small example
projects like those used to teach Angular Boot Camp.

If we use StackBlitz in your class, you'll need to create an account
on GitHub, then use it to log in to StackBlitz.

## Local Development

### Install Node (which includes NPM)

Node.js is a JavaScript runtime environment used by many
Angular-related tools. Please download and install Node.js from [the
Node.js web site](http://nodejs.org/). The Node.js installer also
includes npm. We recommend installing the LTS (Long Term Support)
version of Node.js.

Linux users: we recommend you install Node.js using your package
manager or using a tool like [NVM](https://github.com/creationix/nvm)
or [N](https://github.com/tj/n).

### Download and unzip the course materials

Download the following:

```
https://angularbootcamp.com/abc.zip
```

Then unzip it. Put the files anywhere convenient on your computer.

### IDE Type Support and Web Servers

NPM install will bring in all the typings you need, along with a web
server and demo-API server to use in class. CD to the abc
directory (the result of unzipping the file you downloaded) and type
this command:

```
npm install
```

If you are unable to perform this install on your machine, ask the
instructor for assistance.

### Serve the example applications

**Important**: To run each example, navigate to the "abc" directory
and use a command like so:

```
cd abc
npm run serve 100
```

Change "100" to the example number. Press Control+C to stop the
process so you can restart with another example number.
