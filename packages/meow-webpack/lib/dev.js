"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dev = dev;

var _webpack = _interopRequireDefault(require("webpack"));

var _WebpackDevServerUtils = require("react-dev-utils/WebpackDevServerUtils");

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _chalk = _interopRequireDefault(require("chalk"));

var _path = require("path");

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isInteractive = process.stdout.isTTY;
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8000;
const HOST = process.env.HOST || "0.0.0.0";
const PROTOCOL = process.env.HTTPS ? "https" : "http";

const noop = () => {};

const port = DEFAULT_PORT;
process.env.NODE_ENV = "development";

function dev() {
  const urls = (0, _WebpackDevServerUtils.prepareUrls)(PROTOCOL, HOST, port); // console.log("entry====", join(process.cwd(), "./src/index.js"));

  const compiler = (0, _WebpackDevServerUtils.createCompiler)(_webpack.default, {
    entry: (0, _path.join)(process.cwd(), "./src/index.js"),
    plugins: [...[new _htmlWebpackPlugin.default()]],
    output: {
      path: (0, _path.join)(process.cwd(), "./build"),
      filename: "bundle.js"
    }
  }, "Your App", urls);
  const serverConfig = {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: "none",
    hot: true,
    quiet: true,
    headers: {
      "access-control-allow-origin": "*"
    },
    watchOptions: {
      ignored: /node_modules/
    },
    overlay: false,
    host: HOST,
    https: !!process.env.HTTPS,

    // contentBase: contentBase || process.env.CONTENT_BASE,
    before(app) {
      console.log("before");
    },

    after(app) {
      console.log("after");
    }

  };
  const devServer = new _webpackDevServer.default(compiler, serverConfig);
  devServer.listen(port, HOST, err => {
    if (err) {
      console.log(err);
      return;
    }

    if (isInteractive) {// clearConsole();
    }

    console.log(_chalk.default.cyan("Starting the development server...")); // if (openBrowserOpts) {
    //   openBrowser(urls.localUrlForBrowser);
    // }
    // send({ type: STARTING });
    // if (afterServer) {
    //   afterServer(devServer);
    // }
  });
}