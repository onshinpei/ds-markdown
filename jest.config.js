export default {
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': [
      'babel-jest',
      {
        presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'mjs'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testMatch: ['<rootDir>/test/**/*.test.(ts|tsx|js|jsx)'],
  // Transform all ESM packages in node_modules
  transformIgnorePatterns: [
    '/node_modules/(?!(' +
      '.*unified.*|' +
      '.*unist.*|' +
      '.*remark.*|' +
      '.*rehype.*|' +
      '.*mdast.*|' +
      '.*hast.*|' +
      '.*micromark.*|' +
      '.*vfile.*|' +
      '.*bail|' +
      '.*trough|' +
      '.*devlop|' +
      '.*ccount|' +
      '.*escape-string-regexp|' +
      '.*markdown-table|' +
      '.*zwitch|' +
      '.*longest-streak|' +
      '.*property-information|' +
      '.*space-separated-tokens|' +
      '.*comma-separated-tokens|' +
      '.*estree-util.*|' +
      '.*character-entities.*|' +
      '.*decode-named-character-reference|' +
      '.*trim-lines|' +
      '.*react-markdown.*|' +
      '.*react-markdown-typer.*' +
      ')/)',
  ],
};
