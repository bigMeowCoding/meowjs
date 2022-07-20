import webpack from "webpack";
import {
  createCompiler,
  prepareUrls,
} from "react-dev-utils/WebpackDevServerUtils";
import WebpackDevServer from 'webpack-dev-server';
import chalk from 'chalk';

const isInteractive = process.stdout.isTTY;
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8000;
const HOST = process.env.HOST || "0.0.0.0";
const PROTOCOL = process.env.HTTPS ? "https" : "http";
const noop = () => {};
const port = DEFAULT_PORT

process.env.NODE_ENV = "development";
export function dev() {
  console.log("meow meow meow");
  const urls = prepareUrls(PROTOCOL, HOST, port);
  const compiler = createCompiler(
    webpack,
    {
      entry: "./src/index.js",
    },
    "Your App",
    urls
  );
  console.log(compiler);
  const serverConfig = {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    hot: true,
    quiet: true,
    headers: {
      'access-control-allow-origin': '*',
    },
    publicPath: 'build',
    watchOptions: {
      ignored: /node_modules/,
    },
    overlay: false,
    host: HOST,
    https: !!process.env.HTTPS,
    // contentBase: contentBase || process.env.CONTENT_BASE,
    before(app) {
      console.log('before')
    },
    after(app) {
      console.log('after')
    },
  };

  const devServer = new WebpackDevServer(compiler, serverConfig);
  devServer.listen(port, HOST, err => {
    if (err) {
      console.log(err);
      return;
    }
    if (isInteractive) {
      // clearConsole();
    }
    console.log(chalk.cyan('\nStarting the development server...\n'));
    // if (openBrowserOpts) {
    //   openBrowser(urls.localUrlForBrowser);
    // }
    // send({ type: STARTING });
    // if (afterServer) {
    //   afterServer(devServer);
    // }
  });
}
