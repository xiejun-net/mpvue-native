const {args, config} = require('../build/command-params.js');
module.exports = {
  projectName: args[0],
  config: config
}
