

export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
      "^.+\\.tsx?$": "ts-jest" 
  // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png|css|scss|mp3)$': '<rootDir>src/test/__ mocks __/fileMock.js',
  },
  moduleDirectories: [
    "node_modules",
    "src"
]
}