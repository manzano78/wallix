function buildConfig(env) {
  return require('./webpack.config.' + env.build + '.js')(env)
}

module.exports = buildConfig;