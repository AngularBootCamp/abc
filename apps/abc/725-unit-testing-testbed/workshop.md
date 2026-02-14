# Workshop

When you generated components and services using the CLI, it also
generated a test file for each one. Let's start by getting those basic
tests to pass.

## Run tests with the CLI

```
npx ng test
```

This will use Jest to run all spec files in your
project. It will also watch for changes and rerun the tests as needed.

## Fix the default tests

You will probably have some test failures right away. When the CLI
generated your spec files, your components and services didn't have
any dependencies, but now they do. Look at each failing spec file and
correct the setup for the class being tested. Remember, the CLI
generates the most complex setup by default. Take a moment to think
about what kind of test setup is really best for what needs to be
tested.

## Test functionality

Add some test cases ("its") to the spec files to test the expected
behavior of the component or service.
