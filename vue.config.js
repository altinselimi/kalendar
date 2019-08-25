const WorkerPlugin = require('worker-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new WorkerPlugin()
    ]
  }
};