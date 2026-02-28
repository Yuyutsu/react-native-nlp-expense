module.exports = {
  // compile chrono-node's namespace exports to CJS so that Metro/other bundlers
  // consuming this package never see the ES module syntax that trips them up.
  presets: ['@babel/preset-env'],
  plugins: ['@babel/plugin-transform-export-namespace-from'],
};
