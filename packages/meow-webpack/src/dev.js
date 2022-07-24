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
import HTMLWebpackPlugin from "html-webpack-plugin";

process.env.NODE_ENV = "development";
export function dev() {
  const urls = prepareUrls(PROTOCOL, HOST, port);
  // console.log("entry====", join(process.cwd(), "./src/index.js"));
  const compiler = webpack({
    mode:'development',
    entry: join(process.cwd(), "./src/index.js"),
    plugins: [...[new HTMLWebpackPlugin()]],
    output: { path: join(process.cwd(), "./build"), filename: "bundle.js" },
  });

  const serverConfig = {
    // disableHostCheck: true,
    // headers: {
    //   "access-control-allow-origin": "*",
    // },
    open: true,
    port: port,
    host: HOST,
  };

  const devServer = new WebpackDevServer(compiler, serverConfig);
  devServer.startCallback((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(chalk.cyan("Starting the development server..."));
    // if (openBrowserOpts) {
    //   openBrowser(urls.localUrlForBrowser);
    // }
    // send({ type: STARTING });
    // if (afterServer) {
    //   afterServer(devServer);
    // }
  });
}
