import { defineConfig } from 'eslint/config';

import cypress from 'eslint-plugin-cypress';
import ngrx from '@ngrx/eslint-plugin/v9';
import nx from '@nx/eslint-plugin';
import perfectionist from 'eslint-plugin-perfectionist';
import stylistic from '@stylistic/eslint-plugin';
import tsdoc from 'eslint-plugin-tsdoc';

import * as jsoncParser from 'jsonc-eslint-parser';

const cypressConfig = defineConfig({
  files: ['**/cypress/**/*.ts'],
  extends: [cypress.configs.recommended],
  rules: {
    'cypress/unsafe-to-chain-command': 'off',
  },
});

const ngrxConfig = defineConfig({
  files: ['**/*.ts'],
  extends: [ngrx.configs.allTypeChecked],
  rules: {
    '@ngrx/on-function-explicit-return-type': 'off',
    '@ngrx/prefer-effect-callback-in-block-statement': 'off',
  },
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
});

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  ...cypressConfig,
  ...ngrxConfig,
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    plugins: {
      '@stylistic': stylistic,
      perfectionist,
      tsdoc,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        // Enable typed linting.
        projectService: {
          // Avoid triggering a parsing error.
          allowDefaultProject: ['jest.config.ts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TODO: Define these for different sectios of the monorepo.
      //
      // '@angular-eslint/component-selector': [
      //   'error',
      //   {
      //     type: 'element',
      //     prefix: 'app',
      //     style: 'kebab-case',
      //   },
      // ],

      // '@angular-eslint/directive-selector': [
      //   'error',
      //   {
      //     type: 'attribute',
      //     prefix: 'app',
      //     style: 'camelCase',
      //   },
      // ],

      '@angular-eslint/prefer-inject': 'error',

      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-output-emitter-ref': 'error',
      '@angular-eslint/prefer-output-readonly': 'error',

      '@angular-eslint/prefer-signals': [
        'error',
        {
          preferReadonlySignalProperties: true,
          preferInputSignals: true,
          preferQuerySignals: false,
          useTypeChecking: true,
        },
      ],

      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/no-uncalled-signals': 'error',
      '@angular-eslint/relative-url-prefix': 'error',
      '@angular-eslint/use-component-selector': 'error',
      '@angular-eslint/use-component-view-encapsulation': 'error',
      '@angular-eslint/use-injectable-provided-in': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',

      // Use a single import statement per module. Note that this uses
      // the rule built in to eslint instead of something more advanced
      // like `import/no-duplicates` from eslint-plugin-import. This is
      // simpler to configure and doesn't require any extra
      // dependencies (but isn't auto-fixable, alas).
      'no-duplicate-imports': 'error',

      // Sort and group module import statements, generally from
      // least-to-most-specific, with Angular imports pushed closer to
      // the top.
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'natural',
          newlinesBetween: 1,
          groups: [
            'builtin',

            // List imports like `@Component`, `@Injectable`, etc.,
            // early, so it's easy to tell at a glance what kind of
            // module a file contains.
            'angular-core',

            // Packages installed by default as part of Angular, like
            // `@angular/router`
            'angular-defaults',

            // RxJS is kind of an honorary default Angular package, at
            // least for now, so it sits between `angular-defaults` and
            // `angular-other`. When RxJS actually becomes optional,
            // this group will probably end up after `angular-other`, or
            // may just be folded into `external`.
            'rxjs',

            // Packages from Angular that require a separate install,
            // like `@angular/material`
            'angular-other',

            'external',
            'internal',

            // Class materials library code
            'class-materials-shared',
            'class-materials-other',

            // Per-project code, from least-specific to most-specific
            'parent',
            'sibling',
          ],
          customGroups: [
            {
              groupName: 'angular-core',
              elementNamePattern: '^@angular/core\\b',
            },
            {
              groupName: 'angular-defaults',

              // This pattern is based on a subset of the Angular
              // default dependencies listed here:
              // https://angular.dev/reference/configs/npm-packages
              elementNamePattern:
                '^@angular/(' +
                [
                  'animations',
                  'cli',
                  'common',
                  'compiler',
                  'compiler-cli',
                  'forms',
                  'platform-browser',
                  'platform-browser-dynamic',
                  'router',
                ].join('|') +
                ')\\b',
            },
            {
              groupName: 'rxjs',
              elementNamePattern: '^rxjs$',
            },
            {
              groupName: 'angular-other',
              elementNamePattern: '^@angular/.+\\b',
            },

            // @class-materials imports could also be handled by tweaking
            // `internalPattern`, but this makes it easier to list
            // `@class-materials/shared` imports first.
            {
              groupName: 'class-materials-shared',
              elementNamePattern: '^@class-materials/shared\\b',
            },
            {
              groupName: 'class-materials-other',
              elementNamePattern: '^@class-materials\\b',
            },
          ],
        },
      ],

      'perfectionist/sort-named-imports': [
        'error',
        {
          type: 'natural',
          groups: ['all-capitals-and-underscores', 'starts-with-capital'],

          // Class, types, important constants, etc., often have
          // NAMES_LIKE_THIS or NamesLikeThis, so they're given their
          // own groups and placed ahead of other imports.
          customGroups: [
            {
              type: 'natural',
              groupName: 'all-capitals-and-underscores',
              elementNamePattern: '^[A-Z][A-Z_]+$',
            },
            {
              type: 'natural',
              groupName: 'starts-with-capital',
              elementNamePattern: '^[A-Z]',
            },
          ],
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',

        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },

        // // Don't start interfaces with an "I".
        // {
        //   selector: 'interface',
        //   format: ['PascalCase'],
        //   custom: {
        //     regex: '^I[A-Z]',
        //     match: false,
        //   },
        // },

        {
          selector: ['function', 'method'],
          format: ['camelCase'],
        },

        // Allow constants defined at the top-level scope (which isn't
        // truly global, despite what the modifier's called) to be
        // either camelCase or UPPER_CASE.
        {
          selector: 'variable',
          modifiers: ['const', 'global'],
          format: ['camelCase', 'UPPER_CASE'],
        },

        // For now, allow Zod schema definitions to be either PascalCase
        // or camelCase, since the naming convention isn't settled yet.
        {
          filter: 'Schema$',
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'PascalCase'],
        },

        // NgRx stores can be camelCase or PascalCase.
        {
          filter: 'Store$',
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'PascalCase'],
        },

        {
          // Note: The 'variable' selector includes identifiers declared
          // with `const`, `let`, and `var`.
          selector: ['variable', 'parameter'],
          format: ['camelCase'],
        },

        // Require any unused variables and parameters to start with an
        // underscore.
        {
          selector: ['variable', 'parameter'],
          modifiers: ['unused'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },

        // This is more permissive than it should be, but it's probably
        // not possible to express the exhaustive set of rules for class
        // properties just using '@typescript-eslint/naming-convention'.
        //
        // What I'd prefer:
        // - private properties can (but aren't required to) start with an
        //   underscore
        // - protected and public properties can't start with an underscore
        // - readonly properties can be
        //   - camelCase with an optional leading underscore,
        //   - or UPPER_CASE without a leading underscore
        //
        {
          selector: 'classProperty',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },

        // Types and object literals often describe external data
        // structures, so their property names come in several formats.
        // (We could technically use a smaller set of formats for type
        // properties, since many types are inferred from Zod schemas,
        // but it's less confusing to keep the list of formats the same
        // for both.)
        {
          selector: ['typeProperty', 'objectLiteralProperty'],
          format: ['camelCase', 'snake_case', 'PascalCase'],
          leadingUnderscore: 'allow',
        },

        // Don't try to enforce a convention for object literal property
        // names that require quotes. They can be nearly anything.
        {
          selector: 'objectLiteralProperty',
          modifiers: ['requiresQuotes'],
          format: null,
        },
      ],

      // Disallow using code marked `@deprecated`. (This rule requires
      // typed linting; see `languageOptions` above.)
      '@typescript-eslint/no-deprecated': 'error',

      // Require class properties to be declared with explicit `public`,
      // `private`, or `protected` modifiers.
      //
      // Now that Angular allows component properties accessed from
      // templates to be `protected` instead of requiring them to be
      // public, leaving properties public by default no longer makes
      // sense. (This rule could be scoped to just Angular components,
      // but it's applied to all TypeScript classes for consistency.)
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            accessors: 'explicit',
            constructors: 'no-public',
            methods: 'off', // for now
            properties: 'explicit',
            parameterProperties: 'no-public',
          },
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    rules: {
      // Require curly braces around single-line blocks.
      curly: 'error',

      'no-param-reassign': ['error', { props: true }],

      // These are handled by equivalent @typescript-eslint rules, so
      // they're disabled to avoid conflicts.
      'no-restricted-imports': 'off',
      'no-unused-vars': 'off',

      'tsdoc/syntax': 'error',

      '@stylistic/no-extra-semi': 'error',

      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-explicit-any': 'error',

      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@angular/common',
              importNames: ['CommonModule'],
              message: 'Import specific pipes and directives instead',
            },
            {
              name: '@angular/common',
              importNames: [
                'NgFor',
                'NgForOf',
                'NgForOfContext',
                'NgIf',
                'NgIfContext',
                'NgSwitch',
                'NgSwitchCase',
                'NgSwitchDefault',
              ],
              message:
                'Use template control flow (@if, @for, etc.) instead',
            },
            {
              name: '@angular/common',
              importNames: ['NgClass', 'NgStyle'],
              message: 'Use [class] and [style] bindings instead',
            },
          ],
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      // TODO: Convert to errors once applicable code is updated.
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/mouse-events-have-key-events': 'off',
      '@angular-eslint/template/label-has-associated-control': 'off',

      // TODO: Convert to error once Angular ESLint can distinguish
      // between signals and other types of methods.
      '@angular-eslint/template/no-call-expression': 'off',

      '@angular-eslint/template/no-any': 'error',
      '@angular-eslint/template/no-interpolation-in-attributes': 'error',

      '@angular-eslint/template/no-inline-styles': [
        'error',
        {
          allowBindToStyle: true,
        },
      ],

      '@angular-eslint/template/prefer-at-empty': 'error',
      '@angular-eslint/template/conditional-complexity': 'error',
      '@angular-eslint/template/prefer-contextual-for-variables': 'error',
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
      '@angular-eslint/template/prefer-static-string-properties': 'error',

      // TODO: Gradually decrease maxComplexity as applicable code is updated.
      '@angular-eslint/template/cyclomatic-complexity': [
        'warn',
        { maxComplexity: 10 },
      ],
    },
  },

  {
    files: ['**/*.spec.ts'],
    rules: {
      '@angular-eslint/use-component-selector': 'off',
    },
  },

  // Temporarily loosen some restrictions on non-abc apps, just to make
  // the WIP linting update less noisy along the way.

  {
    files: [
      'apps/ngrx/**/*.ts',
      'apps/rxjs/**/*.ts',
      'apps/server/**/*.ts',
    ],
    rules: {
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',

      'no-param-reassign': ['off', { props: true }],

      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@angular-eslint/prefer-output-emitter-ref': 'off',
      '@angular-eslint/prefer-output-readonly': 'off',
      '@angular-eslint/prefer-signals': 'off',
    },
  },
  {
    files: ['apps/server/**/*.ts'],
    rules: {
      '@angular-eslint/use-injectable-provided-in': 'off',
    },
  },
  {
    files: ['apps/ngrx/**/*.html', 'apps/rxjs/**/*.html'],
    rules: {
      '@angular-eslint/template/no-inline-styles': ['off'],
    },
  },
];
