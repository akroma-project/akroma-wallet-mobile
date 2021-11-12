module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin', 'babel-plugin-transform-typescript-metadata', ['@babel/plugin-proposal-decorators', { legacy: true }]],
};
