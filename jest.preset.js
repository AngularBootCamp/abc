const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  moduleNameMapper: {
    '^lodash-es$': 'lodash'
  }
};
