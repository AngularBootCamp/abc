# Workshop

Note: Your instructor may have changes to the workshops, as our
curriculum is under continuous improvement.

Throughout the class, you'll be working with an application created
using the Angular CLI, like the one available here:

<http://videomanager.angularbootcamp.com>

The features in it provide lots of opportunities to demonstrate and
experiment with important aspects of Angular. Your instructor will work
with you to recreate (portions of) an application similar to this one in
class. Follow the instructions below to get started.

## Step 1: Install Node.js

Node.js is a JavaScript runtime environment used by a huge number of
tools and frameworks, including Angular. It includes the `npm` and `npx`
commands, which we'll use throughout the class.

You can download and install the current LTS (Long Term Support) version
of Node.js from <http://nodejs.org>.

Linux users: We recommend installing Node using your package manager or
via a tool like [NVM](https://github.com/creationix/nvm) or
[N](https://github.com/tj/n).

## Step 2: Create an Angular application

Use your terminal to navigate to the desired location for your new
project. Once you're there, enter the following command:

```bash
npx @angular/cli@latest new workshop-app
```

This will create a new folder for your project and generate an Angular
application within it. Once the command completes, go into the
`workshop-app` folder:

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

If you're using VS Code, also install the ESLint extension:

<https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>

Search for "Prettier - Code formatter" in the VS Code Extensions panel,
then click "Install" on the ESLint extension published by Microsoft.

## Step 4: Add a code formatter (Recommended)

Install Prettier:

```bash
npm install prettier eslint-config-prettier --save-dev
```

If you're using VS Code, also install the Prettier extension:

<https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>

Search for "Prettier - Code formatter" in the VS Code Extensions panel,
then click "Install" on the official extension published by the
Prettier organization.

## Step 5: Start your application

Use the Angular CLI to build your application and serve it in
development mode:

```bash
npm start
```

Once the Angular CLI reports that everything is ready, open your browser
and navigate to <http://localhost:4200/> to see the new application.
