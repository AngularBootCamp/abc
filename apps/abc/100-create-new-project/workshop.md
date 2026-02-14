# Workshop

Note: Your instructor may have changes to the workshops, as our
curriculum is under continuous improvement.

Throughout the class, you'll be working with an Angular application
created using the Angular CLI, like the one available here:

<http://videomanager.angularbootcamp.com>

The features in it provide good examples and context to demonstrate and experiment with important aspects of Angular. Your instructor
will work with you to recreate (portions of) an application similar to
this one in class. Follow the instructions below to get started.

## Step 1: Install Node.js

Node.js is a JavaScript runtime environment used by a huge number of
tools and frameworks, including Angular. It includes the `npm` and `npx`
commands, which we'll use throughout the class.

You can download and install the current LTS (Long Term Support) version of Node.js from <http://nodejs.org>.

Linux users: we recommend installing Node using your package manager or
via a tool like [NVM](https://github.com/creationix/nvm) or
[N](https://github.com/tj/n).

## Step 2: Create an Angular application

Use your terminal to navigate to the desired location for your new
project. Once you're there, enter the following command:

```bash
npx @angular/cli@latest new workshop-app
```

This will create a new folder for your project and generate an Angular
application within it. Once the command completes, change directories
into the `workshop-app` folder:

```bash
cd workshop-app
```

## Step 3: Add a linter (Recommended)

The Angular CLI doesn't include a linter by default, but works well with
ESLint and the Angular ESLint package.

<https://eslint.org>

<https://github.com/angular-eslint/angular-eslint>

You can add them with this command:

```bash
npx ng add angular-eslint
```

## Step 4: Add a code formatter (Recommended)

Install Prettier:

```bash
npm install prettier eslint-config-prettier --save-dev
```

If you're using VS Code, also install the Prettier extension by
searching for "Prettier - Code formatter" in the VS Code Extensions
panel, then clicking Install next to the extension published by the
Prettier organization itself. (There will be several pages of results,
so be careful to select the right one. It's normally the first one in the list.)

## Step 5: Start your application

Use the Angular CLI to build your application and serve it in
development mode:

```bash
npm start
```

Once the Angular CLI reports that everything is ready, open Chrome and
navigate to <http://localhost:4200/> to see the new application.
