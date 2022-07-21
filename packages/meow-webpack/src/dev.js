import webpack from "webpack";
import {
  createCompiler,
  prepareUrls,
} from "react-dev-utils/WebpackDevServerUtils";
import WebpackDevServer from "webpack-dev-server";
import chalk from "chalk";

const isInteractive = process.stdout.isTTY;
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8000;
const HOST = process.env.HOST || "0.0.0.0";
const PROTOCOL = process.env.HTTPS ? "https" : "http";
const noop = () => {};
const port = DEFAULT_PORT;
import { join, dirname } from "path";

process.env.NODE_ENV = "development";
export function dev() {
  const urls = prepareUrls(PROTOCOL, HOST, port);
  // console.log("entry====", join(process.cwd(), "./src/index.js"));
  const compiler = createCompiler(
    webpack,
    {
      entry: join(process.cwd(), "./src/index.js"),
      output: { path: join(process.cwd(), "./build"), filename: "bundle.js" },
    },
    "Your App",
    urls
  );

  const serverConfig = {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: "none",
    hot: true,
    quiet: true,
    headers: {
      "access-control-allow-origin": "*",
    },
    watchOptions: {
      ignored: /node_modules/,
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
    },
  };

  const devServer = new WebpackDevServer(compiler, serverConfig);
  devServer.listen(port, HOST, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    if (isInteractive) {
      // clearConsole();
    }
    console.log(chalk.cyan("\nStarting the development server...\n"));
    // if (openBrowserOpts) {
    //   openBrowser(urls.localUrlForBrowser);
    // }
    // send({ type: STARTING });
    // if (afterServer) {
    //   afterServer(devServer);
    // }
  });
}
