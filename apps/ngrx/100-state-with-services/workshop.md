# Workshop

Your instructor may have changes to the workshops, as our curriculum
is under continuous improvement.

## Working with an existing Angular app

In this course, we will add ngrx to an existing Angular app that the
instructor has already shown you. In this workshop, we will make sure
that you can run it on your machine.

## Step 1: Node.js

Node.js is a JavaScript runtime environment used by many
Angular-related tools. Please download and install Node.js from [the
Node.js web site](http://nodejs.org/). The Node.js installer also
includes npm. We recommend installing the LTS (Long Term Support)
version of Node.js.

Linux users: we recommend you install Node.js using your package
manager or using a tool like [NVM](https://github.com/creationix/nvm)
or [N](https://github.com/tj/n).

## Step 2: Run the existing app

- Download the course materials from http://angularbootcamp.com/abc.zip
  and unzip it into a directory on your machine.

- Open a console window, `cd` to the extracted directory, and run
  `npm install` to download the dependencies.

- Run `npm run serve ngrx-100`

- Browse to <http://localhost:4300> to see the running app.

The application is an admin page for a small blog. On this page, you can
select a author, see information about the author, see the titles of all
the author's articles, and select an article to read the content. You
can also create, update, or delete articles, but those changes are not
saved to the server and will be lost upon a page refresh.   
